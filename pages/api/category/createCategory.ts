import { prisma } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const {name, url, type} = req.body
    if(!name || !url || !type){
      return res.status(200).json("Missing field!");
    }
    
    const token = await getToken({req})
    //@ts-ignore
    if(token && token.user?.role === 'ADMIN'){
      await prisma.category.create({data: req.body})
    }
    else{
          return res.status(403).json("You are not the admin")
    }

    return res.status(200).json('Created post successfully!')
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error!")
  }
}
