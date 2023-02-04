import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const { id } = req.query;

      const post = await prisma.post.findFirst({
        where: {
          id: id as string,
        },
      });
      return res.status(200).json(post);
    }
    if (req.method == "PATCH") {
      const { id } = req.query;
      const { content, image, title, summary, category } = req.body;
      if (!content || !image || !title || !summary || !category) {
        return res.status(400).json("Thiếu thông tin");
      }
      const post = await prisma.post.update({
        where: {
          id: id as string,
        },
        data: {
          content,
          image,
          title,
          summary,
          category,
        },
      });
      return res.status(200).json(post);
    }
    if (req.method == "DELETE") {
      const { id } = req.query;
      await prisma.post.delete({
        where: {
          id: id as string,
        },
      });
      return res.status(200).json("Xóa thành công!");
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
