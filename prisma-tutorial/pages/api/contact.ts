// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/* type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'})
  }

  const contactData = JSON.parse(req.body)
  const savedContact = await prisma.contact.create({
    data: contactData
  })

  res.json(savedContact)
}