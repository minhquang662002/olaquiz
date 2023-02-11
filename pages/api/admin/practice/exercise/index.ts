import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const exercises =
        await prisma.$queryRaw`SELECT "Exercise".id, "Exercise"."name", "PracticeTopic".name as "topic" from "Exercise" inner join "PracticeTopic" on "PracticeTopic".id = "Exercise"."practiceTopicId" limit ${rows} offset ${
          rows * page
        }`;

      return res.status(200).json(exercises);
    }

    if (req.method == "POST") {
      const { questions, topic, practiceName } = req.body;

      if (!questions.length || !topic || !practiceName)
        return res.status(400).json("Missing info");
      await prisma.exercise.create({
        data: {
          name: practiceName,
          questions: {
            createMany: {
              data: questions,
            },
          },
          practiceTopicId: topic,
        },
      });

      return res.status(200).json("Created");
    }
  } catch (error) {
    //@ts-ignore
    if (error?.code == "P2002")
      return res.status(500).json("Tên bài tập đã trùng");
    return res.status(500).json("Lỗi hệ thống");
  }
}
