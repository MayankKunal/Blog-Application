import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                BlogSpace
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                  router.pathname === '/' ? 'text-primary-600' : ''
                }`}
              >
                Home
              </Link>
              {status === 'loading' ? (
                <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              ) : session ? (
                <>
                  <Link
                    href="/create"
                    className="btn-primary text-sm"
                  >
                    Write Post
                  </Link>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      Hi, <span className="font-semibold text-primary-600">{session.user?.name}</span>
                    </span>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} BlogSpace. Built with Next.js & MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

