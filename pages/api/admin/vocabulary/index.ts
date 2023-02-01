import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const data = await prisma.topic.findMany({
        take: rows,
        skip: page * rows,
        select: {
          id: true,
          title: true,
        },
      });

      return res.status(200).json(data);
    }
    if (req.method == "POST") {
      const { topic, vocabularies } = req.body;
      const assignedVocabularies = vocabularies.map(
        ({ STT, ...keepAtrbs }: any) => ({ ...keepAtrbs })
      );
      if (!topic.title || !topic.image)
        return res.status(400).json("Thiếu thông tin");
      await prisma.topic.create({
        data: {
          title: topic.title,
          image: topic.image,
          vocabularies: {
            createMany: {
              data: assignedVocabularies,
            },
          },
        },
      });
      return res.status(200).json("Tạo thành công");
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
