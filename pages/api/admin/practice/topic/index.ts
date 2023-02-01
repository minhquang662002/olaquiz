import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {

        if(req.method == "GET") {
            let topics;
            if(!req.query?.type) {
                topics = await prisma.practiceTopic.findMany({
                  
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        
                    },
                    
                })} 
            else {
                topics = await prisma.practiceTopic.findMany({
                    where: {
                        type: req.query.type as string
                    },
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }})
            }
            return res.status(200).json(topics)
        }

        if(req.method == "POST") {
            const {topicName, topicType} = req.body;
            
            await prisma.practiceTopic.create({
                data: {
                    name: topicName,
                    type: topicType
                }
            })
            return res.status(200).json("Tạo thành công")
        }
    } catch (error) {
        return res.status(500).json("Lỗi hệ thống")
    }
}