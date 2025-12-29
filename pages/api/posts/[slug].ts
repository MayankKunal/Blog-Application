import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { requireAuth } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findOne({ slug }).lean();
      
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }

      return res.status(200).json({ success: true, data: post });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const session = await requireAuth(req, res);
      const userId = (session.user as any).id;
      const userRole = (session.user as any).role;

      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }

      // Check if user is the author or admin
      if (post.authorId?.toString() !== userId && userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Not authorized to edit this post' });
      }

      const updatedPost = await Post.findOneAndUpdate(
        { slug },
        req.body,
        { new: true, runValidators: true }
      );

      return res.status(200).json({ success: true, data: updatedPost });
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        return res.status(401).json({ success: false, error: 'Please sign in' });
      }
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const session = await requireAuth(req, res);
      const userId = (session.user as any).id;
      const userRole = (session.user as any).role;

      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }

      // Check if user is the author or admin
      if (post.authorId?.toString() !== userId && userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Not authorized to delete this post' });
      }

      await Post.findOneAndDelete({ slug });

      return res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        return res.status(401).json({ success: false, error: 'Please sign in' });
      }
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
}

