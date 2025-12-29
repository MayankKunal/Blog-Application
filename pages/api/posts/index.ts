import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { published } = req.query;
      const filter: any = {};
      
      if (published !== undefined) {
        filter.published = published === 'true';
      }

      const posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json({ success: true, data: posts });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await requireAuth(req, res);
      const post = await Post.create({
        ...req.body,
        authorId: (session.user as any).id,
      });
      return res.status(201).json({ success: true, data: post });
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        return res.status(401).json({ success: false, error: 'Please sign in to create a post' });
      }
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
}

