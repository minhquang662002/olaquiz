import { prisma } from "../../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const data = await prisma.post.findMany({
        take: rows,
        skip: page * rows,
        select: {
          id: true,
          title: true,
          category: true,
        },
      });
      return res.status(200).json(data);
    }

    if (req.method == "POST") {
      if (!req.body) {
        return res.status(400).json("No content!");
      }

      const { title, image, summary, category, content } = req.body;
      if (!title || !image || !category || !summary || !content) {
        return res.status(400).json("Missing info!");
      }

      await prisma.post.create({
        data: {
          title,
          image,
          summary,
          content,
          category,
        },
      });
      return res.status(200).json("Created post successfully!");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error!");
  }
}
