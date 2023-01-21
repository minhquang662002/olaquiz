import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // if(req.method == 'GET'){
    // const page = req.query.page ?  Number(req.query.page) : 1;
    // const rows = req.query.rows ? Number(req.query.rows) : 5;
    // const data = await prisma.test.findMany({
    //     take: rows,
    //     skip: page * rows
    // })
    // return res.status(200).json(data)
    // }
    if (req.method == "POST") {
      const session = await getToken({ req });
      if (!session) return res.status(400).json("Cần đăng nhập");

      const { score, testId, answeredArr } = req.body;
      await prisma.result.create({
        data: {
          testId,
          //@ts-ignore
          userId: session?.user?.id as string,
          score,
          time: "test",
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