import { prisma } from "../../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const token = await getToken({ req });
      let data;

      //@ts-ignore
      if (token.user.roleId == 1) {
        data = await prisma.user.findMany({
          where: {
            NOT: {
              roleId: 1,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: {
              select: {
                name: true,
              },
            },
          },

          take: rows,
          skip: page * rows,
        });
      }

      //@ts-ignore
      if (token.user.roleId == 2) {
        data = await prisma.user.findMany({
          where: {
            NOT: [
              {
                roleId: 1,
              },
              {
                roleId: 2,
              },
            ],
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: {
              select: {
                name: true,
              },
            },
          },
          take: rows,
          skip: page * rows,
        });
      }
      data = data?.map((item) => ({ ...item, role: item.role.name }));
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
