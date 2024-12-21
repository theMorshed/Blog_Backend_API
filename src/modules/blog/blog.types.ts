// Importing Types from Mongoose to handle ObjectId references
import { Types } from "mongoose";

/**
 * Type definition for the Blog entity.
 * 
 * This type defines the structure of a Blog document in the database, including the title, content, 
 * author reference, and published status.
 * 
 * @property title - The title of the blog post.
 * @property content - The content or body of the blog post.
 * @property author - A reference to the `User` model, representing the author of the blog.
 * @property isPublished - A boolean indicating whether the blog is published or not.
 */
export type TBlog = {
    title: string; // Name of the blog
    content: string; // content of the blog
    author: Types.ObjectId; // reference to the User model
    isPublished: boolean; // Indicates whether the blog is published
};
