import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "DELETE") {
      const { id } = req.query;
      const session = await getSession({ req });
      const user = await prisma.user.findFirst({ where: { id: id as string } });
      if ((user?.roleId as number) > (session?.user?.roleId || 0)) {
        return res.status(400).json("Không đủ thẩm quyền");
      }
      await prisma.user.delete({
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
