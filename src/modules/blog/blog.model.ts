import { model, Model, Schema } from "mongoose";
import { TBlog } from "./blog.types";

// Create the Blog Schema
const BlogSchema: Schema<TBlog> = new Schema(
{
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Custom toJSON method to exclude __v and timestamps in the response
BlogSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Delete the fields you don't want in the response
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

// Create and export the Mongoose model
const Blog: Model<TBlog> = model<TBlog>('Blog', BlogSchema);

export default Blog;