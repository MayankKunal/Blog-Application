import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getServerSideSession(req?: NextApiRequest, res?: NextApiResponse) {
  if (req && res) {
    return await getServerSession(req as any, res as any, authOptions);
  }
  return await getServerSession(authOptions);
}

export async function requireAuth(req?: NextApiRequest, res?: NextApiResponse) {
  const session = await getServerSideSession(req, res);
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

