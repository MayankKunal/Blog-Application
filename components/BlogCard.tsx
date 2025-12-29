import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { IPostPlain } from '@/models/Post';

interface BlogCardProps {
  post: IPostPlain;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card h-full group cursor-pointer">
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="font-medium text-primary-600">{post.author}</span>
            <span className="mx-2">•</span>
            <time>{formatDate(post.createdAt)}</time>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
            Read more
            <svg
              className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

