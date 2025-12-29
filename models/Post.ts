import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorId?: mongoose.Types.ObjectId;
  coverImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostPlain {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorId?: string | mongoose.Types.ObjectId;
  coverImage?: string;
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [300, 'Excerpt cannot be more than 300 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    coverImage: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;

