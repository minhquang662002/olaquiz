import { prisma } from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const page = req.query.page ? Number(req.query.page) : 1; 
        const rows = req.query.rows ? Number(req.query.rows) : 5;
        const data = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: {
                    select: {
                        name: true
                    }
                }
            },
            take: rows,
            skip: page * rows
        });
        
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}