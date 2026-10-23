// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataByQuery } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categoryId = (req.query.categoryId || req.query.category) as string | undefined;

  try {
    if (categoryId) {
      // 1. Query Firestore with where("categoryId", "==", categoryId)
      let data = await retrieveDataByQuery("detail_categories", "categoryId", "==", categoryId);
      if (!data || data.length === 0) {
        data = await retrieveDataByQuery("books", "categoryId", "==", categoryId);
      }
      return res.status(200).json({ status: true, statusCode: 200, data: data || [] });
    }

    const data = await retrieveData("detail_categories");
    return res.status(200).json({ status: true, statusCode: 200, data: data || [] });
  } catch (error: any) {
    console.error('Error in api/detail_categories:', error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      data: [],
      message: error?.message || 'Gagal mengambil data buku dari Firebase Firestore.',
    });
  }
}