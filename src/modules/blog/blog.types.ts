import { Types } from "mongoose";

// Blog Type Definition
export type TBlog = {
    title: string; // Name of the blog
    content: string; // content of the blog
    author: Types.ObjectId; // reference to the User model
    isPublished: boolean; // Indicates whether the blog is published
};