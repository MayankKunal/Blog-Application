# BlogSpace - Modern Blog Website

A beautiful, modern blog website built with Next.js and MongoDB.

## Features

- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🔐 **Authentication** - Secure user authentication with NextAuth.js
- 📝 **Markdown Support** - Write posts using Markdown syntax
- 🔍 **SEO Friendly** - Optimized for search engines
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Built with Next.js for optimal performance
- 🗄️ **MongoDB** - Robust database for storing blog posts
- 👤 **User Management** - User accounts with role-based access

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blog-website
   NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   Or for MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-website?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   **Note:** Generate a secure random string for `NEXTAUTH_SECRET`. You can use:
   ```bash
   openssl rand -base64 32
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Authentication

1. **Sign Up**: Click "Sign Up" in the navigation bar to create a new account
2. **Sign In**: Use your email and password to sign in
3. **Sign Out**: Click "Sign Out" in the navigation bar when logged in

### Creating a Blog Post

1. **Sign in** to your account (required)
2. Click on "Write Post" in the navigation bar
3. Fill in the form:
   - **Title**: The title of your post
   - **Excerpt**: A brief summary (max 300 characters)
   - **Author**: Your name (auto-filled from your account)
   - **Cover Image URL**: Optional image URL
   - **Content**: Your post content (Markdown supported)
   - **Publish immediately**: Check to publish right away
4. Click "Create Post"

### Viewing Posts

- All published posts appear on the homepage
- Click on any post card to read the full article
- Posts are displayed in reverse chronological order
- Only authenticated users can create posts
- Users can only edit/delete their own posts (admins can edit/delete any post)

## Project Structure

```
├── components/          # React components
│   ├── Layout.tsx      # Main layout with navigation
│   └── BlogCard.tsx    # Blog post card component
├── lib/                # Utility functions
│   ├── mongodb.ts      # MongoDB connection
│   └── utils.ts        # Helper functions
├── models/             # Database models
│   ├── Post.ts         # Blog post model
│   └── User.ts         # User model
├── types/              # TypeScript type definitions
│   └── next-auth.d.ts  # NextAuth type extensions
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── posts/          # Individual post pages
│   ├── _app.tsx        # App wrapper
│   ├── index.tsx       # Homepage
│   ├── create.tsx      # Create post page
│   └── 404.tsx         # 404 page
└── styles/             # Global styles
    └── globals.css     # Tailwind CSS and custom styles
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing
- **Tailwind CSS** - Styling
- **React Markdown** - Markdown rendering

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (optional query: `?published=true`)
- `POST /api/posts` - Create a new post (requires authentication)
- `GET /api/posts/[slug]` - Get a specific post
- `PUT /api/posts/[slug]` - Update a post (requires authentication, author or admin only)
- `DELETE /api/posts/[slug]` - Delete a post (requires authentication, author or admin only)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication endpoints

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `MONGODB_URI` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## License

MIT License - feel free to use this project for your own blog!

