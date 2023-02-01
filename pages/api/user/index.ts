import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../utils/db";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "PATCH") {
      const session = await getSession({ req });
      const { name, dateBirth, phone, email } = req.body;
      if (!name || !email) {
        return res.status(200).json("Thiếu trường");
      }
      if (!session) {
        return res.status(403).json("Cần đăng nhập");
      }
      await prisma.user.update({
        where: {
          id: session?.user.id as string,
        },
        data: {
          birthDay: dateBirth,
          name,
          email,
          phoneNumber: phone,
        },
      });
      return res.status(200).json("Cập nhật thành công");
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
