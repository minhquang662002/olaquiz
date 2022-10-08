import { prisma } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {


  if(!req.body){
    return res.status(400).json("No content!")
  }
  const {title, image, summary, category, content} = req.body
  if(!title || !image || !category || !summary || !content){
    return res.status(400).json('Missing info!')
  }

  await prisma.post.create({data: {
    title, image, summary, content, category
  }})
  return res.status(200).json('Created post successfully!')

  } catch (error) {
    return res.status(500).json("Internal server error!")
  }
}
