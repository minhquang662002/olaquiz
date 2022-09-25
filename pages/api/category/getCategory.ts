import { prisma } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const data = await prisma.category.findMany()

    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error!")
  }
}
