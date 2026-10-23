// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from '@/lib/firebase/service';
import { defaultCategories } from '@/lib/data/defaultData';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Determine if specific category ID is requested
  let categoryId: string | null = null;
  if (Array.isArray(req.query.categories)) {
    if (req.query.categories.length > 1) {
      categoryId = req.query.categories[1];
    } else if (req.query.categories.length === 1 && req.query.categories[0] !== 'categories') {
      categoryId = req.query.categories[0];
    }
  } else if (typeof req.query.id === 'string') {
    categoryId = req.query.id;
  }

  if (categoryId) {
    try {
      const data = await retrieveDataById("categories", categoryId);
      if (data) {
        return res.status(200).json({ status: true, statusCode: 200, data });
      }
    } catch (err) {
      console.error(err);
    }
    const fallbackItem = defaultCategories.find((c) => c.id === categoryId);
    return res.status(200).json({ status: true, statusCode: 200, data: fallbackItem || null });
  }

  try {
    const data = await retrieveData("categories");
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json({ status: true, statusCode: 200, data });
    }
    return res.status(200).json({ status: true, statusCode: 200, data: defaultCategories });
  } catch (error) {
    return res.status(200).json({ status: true, statusCode: 200, data: defaultCategories });
  }
}