import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const session = await getSession({ req });
      if (!session) return res.status(400).json("Cần đăng nhập");
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const data = await prisma.result.findMany({
        where: {
          userId: session.user.id as string,
        },
        select: {
          Test: {
            select: {
              name: true,
              type: true,
            },
          },
          id: true,
          score: true,
          remainTime: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: rows,
        skip: page * rows,
      });
      return res.status(200).json(data);
    }
    if (req.method == "POST") {
      const session = await getSession({ req });
      if (!session) return res.status(400).json("Cần đăng nhập");

      const { score, testId, answeredArr, time } = req.body;
      await prisma.result.create({
        data: {
          testId,
          //@ts-ignore
          userId: session?.user?.id as string,
          score,
          remainTime: time,
          answer: {
            createMany: {
              data: answeredArr,
            },
          },
        },
      });
      return res.status(200).json("Created successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}
