import { retrieveDataById } from '@/lib/firebase/service';
import { defaultBlogs, defaultDetailBlogs } from '@/lib/data/defaultData';
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
  const { blog } = req.query;
  const blogId = Array.isArray(blog) ? blog[0] : (blog as string);

  if (!blogId) {
    return res.status(400).json({ status: false, statusCode: 400, data: null });
  }

  try {
    // 1. Try querying collection 'detail_blogs' by ID
    let data = await retrieveDataById('detail_blogs', blogId);
    
    // 2. If not found in detail_blogs, try querying 'blogs' by ID
    if (!data) {
      data = await retrieveDataById('blogs', blogId);
    }

    if (data) {
      return res.status(200).json({ status: true, statusCode: 200, data });
    }
  } catch (error) {
    console.error(`Error fetching blog ${blogId}:`, error);
  }

  // Fallback to local default data matching the ID or return matching blog
  const fallback =
    defaultDetailBlogs.find((b) => b.id === blogId) ||
    defaultBlogs.find((b) => b.id === blogId) ||
    defaultDetailBlogs[0];

  return res.status(200).json({ status: true, statusCode: 200, data: fallback });
}
