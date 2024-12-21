import QueryBuilder from "../../builder/QueryBuilder";
import Blog from "./blog.model";
import { TBlog } from "./blog.types";

export const createBlogService = async(payload: TBlog) => {
    const blog = await Blog.create(payload);
    return blog;
}

export const getAllBlogsService = async(query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find().populate('author', 'name email'), query)
    .search(['title', 'content'])
    .sort()
    .filter();

    const blogs = await blogQuery.modelQuery;
    return blogs;
}

export const updateBlogService = async(id: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return blog;
}

export const deleteBlogService = async(id: string) => {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}