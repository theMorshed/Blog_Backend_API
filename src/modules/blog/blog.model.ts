/**
 * Import necessary modules from Mongoose.
 * - `model`: A function to create a model based on a schema.
 * - `Model`: A type representing a Mongoose model.
 * - `Schema`: A class used to define the structure of documents in a MongoDB collection.
 * 
 * The `TBlog` type is imported from the `blog.types` file to define the shape of a blog document.
 */
import { model, Model, Schema } from "mongoose";
import { TBlog } from "./blog.types";

/**
 * The Blog Schema defines the structure and validation rules for the Blog documents.
 * 
 * This schema includes fields for:
 * - `title`: A required string field for the blog's title.
 * - `content`: A required string field for the blog's content.
 * - `author`: A reference to a `User` document, representing the blog's author.
 * - `isPublished`: A boolean field to indicate whether the blog is published (defaults to true).
 * 
 * The schema also automatically adds `createdAt` and `updatedAt` fields due to the `timestamps` option.
 */
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

/**
 * Custom `toJSON` method for the Blog Schema.
 * 
 * This method modifies the JSON representation of the Blog document by excluding the following fields:
 * - `__v`: The internal version key used by Mongoose.
 * - `createdAt`: The timestamp for when the document was created.
 * - `updatedAt`: The timestamp for when the document was last updated.
 * 
 * This ensures that these fields are not included in the API response.
 */
BlogSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

/**
 * Create and export the Mongoose model for the Blog collection.
 * 
 * This model allows interaction with the Blog collection in the database using the Blog schema.
 */
const Blog: Model<TBlog> = model<TBlog>('Blog', BlogSchema);

export default Blog;