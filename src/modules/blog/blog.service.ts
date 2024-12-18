import Blog from "./blog.model";
import { TBlog } from "./blog.types";

export const createBlogService = async(payload: TBlog) => {
    const blog = await Blog.create(payload);
    return blog;
}

export const updateBlogService = async(id: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return blog;
}

export const deleteBlogService = async(id: string) => {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}