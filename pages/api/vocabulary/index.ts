import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
      const { topicID } = req.query;
      const data = await prisma.vocabulary.findMany({
        where: {
          topicId: topicID as string,
        },
      });
      return res.status(200).json(data);
    }
    if(req.method == "POST"){
        const {topicId} = req.query;
        const {vocabularies} = req.body;
        console.log(topicId, req.query ,vocabularies)
        const assignedVocabularies = vocabularies.map(({STT, ...keepAtrbs}:any) => ({...keepAtrbs, topicId}))
        await prisma.vocabulary.createMany({
            data: assignedVocabularies,
        })
        return res.status(200).json("Created successfully!")
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error");
  }
}
