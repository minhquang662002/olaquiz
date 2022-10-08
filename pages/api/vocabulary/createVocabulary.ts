import { prisma } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const {topic, vocabularies}  = req.body;
        const newTopic = await prisma.topic.create({
            data: {
                ...topic
            }
        })
        const updatedVocabularies = vocabularies.map(({STT, ...keepAtrbs}:any) => ({...keepAtrbs, topicId: newTopic.id}))
        await prisma.vocabulary.createMany({
            data: updatedVocabularies
        })
        return res.status(200).json("Created successfully!")
    } catch (error) {
        return res.status(500).json("Internal server error!")
    }
}