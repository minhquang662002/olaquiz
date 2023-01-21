import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const exerciseId = req.query?.exerciseId as string;
      const data = await prisma.exercise.findFirst({
        where: {
          id: exerciseId,
        },
        include: {
          questions: true,
        },
      });
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
}
