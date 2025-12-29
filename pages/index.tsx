import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { IPostPlain } from '@/models/Post';

export default function Home() {
  const [posts, setPosts] = useState<IPostPlain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?published=true');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to BlogSpace
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover amazing stories, insights, and ideas from our community of writers
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No posts yet</h2>
            <p className="text-gray-600 mb-8">Be the first to share your story!</p>
            <Link href="/create" className="btn-primary inline-block">
              Create Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Posts</h2>
              <p className="text-gray-600 text-lg">Explore our collection of articles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
      </div>
  );
}

