import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "DELETE") {
      const { id } = req.query;
      await prisma.topic.delete({
        where: {
          id: id as string,
        },
      });
      return res.status(200).json("Xóa thành công");
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
