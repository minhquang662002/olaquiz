import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).json("Cần đăng nhập");
      }
      const { id } = req.query;
      const testQuery = await prisma.test.findFirst({
        where: {
          id: id as string,
        },
        select: {
          questions: {
            orderBy: {
              STT: "asc",
            },
          },
          name: true,
        },
      });

      const result = await prisma.result.findFirst({
        where: {
          testId: id as string,
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          answer: {
            select: {
              id: true,
              number: true,
              answer: true,
            },
          },
          score: true,
          remainTime: true,
        },
      });

      const ranking =
        await prisma.$queryRaw`select max("Result"."score") as score, "User"."avatar", "User"."firstName",
    "User"."lastName" from "Result"
   inner join "User" on "User".id = "Result"."userId"
   inner join "Test" on "Test".id = "Result"."testId"
   group by  "User"."avatar", "User"."firstName",
    "User"."lastName", "Result"."testId"
   having "Result"."testId" = ${id} order by score desc limit 10`;

      return res.status(200).json({ ...testQuery, result, ranking });
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
