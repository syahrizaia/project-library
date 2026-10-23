// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData } from '@/lib/firebase/service'
import { defaultBlogs } from '@/lib/data/defaultData'
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
    const data = await retrieveData("blogs")
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json({ status: true, statusCode: 200, data })
    }
    return res.status(200).json({ status: true, statusCode: 200, data: defaultBlogs })
  } catch (error) {
    return res.status(200).json({ status: true, statusCode: 200, data: defaultBlogs })
  }
}