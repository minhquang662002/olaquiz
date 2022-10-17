import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // if(req.method == 'GET'){
    // const page = req.query.page ?  Number(req.query.page) : 1;
    // const rows = req.query.rows ? Number(req.query.rows) : 5;
    // const data = await prisma.topic.findMany({
    //     take: rows,
    //     skip: page * rows
    // })
    // return res.status(200).json(data)
    // }
    if (req.method == "POST") {
      const { questions } = req.body;
      await prisma.test.create({
        data: {
          name: "Test 3",
          type: "mini",
          questions: {
            createMany: {
              data: [
                {
                  option_1: "A",
                  audio: "co",
                  image: "co",
                  paragraph: "test paragraph",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  question: "haha",
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  question: "haha",
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
              ],
            },
          },
        },
      });
      await prisma.test.create({
        data: {
          name: "Test 4",
          type: "mini",
          questions: {
            createMany: {
              data: [
                {
                  option_1: "A",
                  audio: "co",
                  image: "co",
                  paragraph: "test paragraph",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  question: "haha",
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  question: "haha",
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
                {
                  option_1: "A",
                  option_2: "B",
                  option_3: "C",
                  option_4: "D",
                  answer: "A",
                },
              ],
            },
          },
        },
      });
      return res.status(200).json("Created successfully");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
}
