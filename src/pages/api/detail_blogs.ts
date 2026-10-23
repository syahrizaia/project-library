// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from '@/lib/firebase/service'
import { defaultDetailBlogs } from '@/lib/data/defaultData'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean
  statusCode: Number
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await retrieveData("detail_blogs")
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json({ status: true, statusCode: 200, data })
    }
    return res.status(200).json({ status: true, statusCode: 200, data: defaultDetailBlogs })
  } catch (error) {
    return res.status(200).json({ status: true, statusCode: 200, data: defaultDetailBlogs })
  }
}