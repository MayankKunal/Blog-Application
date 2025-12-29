# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up MongoDB

### Option A: Local MongoDB

1. Install MongoDB on your machine
2. Start MongoDB service
3. Create `.env.local` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blog-website
   NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
   NEXTAUTH_URL=http://localhost:3000
   ```

### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Create `.env.local` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-website?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
   NEXTAUTH_URL=http://localhost:3000
   ```
   Replace `username`, `password`, and `cluster` with your actual values.

**Important:** Generate a secure random string for `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Create an Account

1. Click "Sign Up" in the navigation bar
2. Fill in your name, email, and password
3. You'll be automatically signed in after registration

## Step 5: Create Your First Post

1. Make sure you're signed in (you'll see your name in the navigation)
2. Click "Write Post" in the navigation
3. Fill in the form and create your first blog post!

## Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is running (if using local)
- Verify your `MONGODB_URI` in `.env.local` is correct
- Check that your MongoDB Atlas IP whitelist includes your IP (if using Atlas)

### Port Already in Use

If port 3000 is already in use, you can change it:
```bash
PORT=3001 npm run dev
```

## Next Steps

- Customize the design in `tailwind.config.js`
- Add authentication for admin features
- Deploy to Vercel, Netlify, or your preferred platform

