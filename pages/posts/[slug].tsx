import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/utils';
import { IPostPlain } from '@/models/Post';
import Link from 'next/link';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<IPostPlain | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.data);
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="min-h-screen">
      {/* Hero Image Section */}
      {post.coverImage && (
        <div className="relative h-96 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span className="font-semibold text-primary-600">{post.author}</span>
            <span className="mx-3">•</span>
            <time>{formatDate(post.createdAt)}</time>
          </div>
          {post.excerpt && (
            <p className="text-xl text-gray-600 italic border-l-4 border-primary-500 pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="markdown-content"
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .markdown-content {
          line-height: 1.8;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          margin-top: 2em;
          margin-bottom: 1em;
          font-weight: bold;
        }
        .markdown-content h1 {
          font-size: 2.25em;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5em;
        }
        .markdown-content h2 {
          font-size: 1.75em;
        }
        .markdown-content h3 {
          font-size: 1.5em;
        }
        .markdown-content p {
          margin-bottom: 1.5em;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin-bottom: 1.5em;
          padding-left: 2em;
        }
        .markdown-content li {
          margin-bottom: 0.5em;
        }
        .markdown-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
        .markdown-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin-bottom: 1.5em;
        }
        .markdown-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .markdown-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5em;
          margin: 1.5em 0;
          color: #6b7280;
          font-style: italic;
        }
        .markdown-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .markdown-content a:hover {
          color: #1d4ed8;
        }
        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1.5em 0;
        }
      `}</style>
    </article>
  );
}

