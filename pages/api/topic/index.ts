import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/db'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method == 'GET'){
        const page = req.query.page ?  Number(req.query.page) : 1;
        const rows = req.query.rows ? Number(req.query.rows) : 5;
        const data = await prisma.topic.findMany({
            take: rows,
            skip: page * rows
        })
        return res.status(200).json(data)
        }


    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}