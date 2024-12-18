import Blog from "./blog.model";
import { TBlog } from "./blog.types";

export const createBlogService = async(payload: TBlog) => {
    const result = await Blog.create(payload);
    return result;
}