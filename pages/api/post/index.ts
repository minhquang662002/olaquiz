import { prisma } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | string>
) {
  try {
    if (req.method == "GET") {
      const page = req.query.page ? Number(req.query.page) : 1;
      const rows = req.query.rows ? Number(req.query.rows) : 5;
      const data = await prisma.post.findMany({
        take: rows,
        skip: page * rows,
      });
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json("Internal server error!");
  }
}
