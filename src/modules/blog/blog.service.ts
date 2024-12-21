/**
 * Import necessary modules and models for blog services.
 * - `QueryBuilder`: A utility class to help build and execute queries with search, sort, and filter functionality.
 * - `Blog`: The Mongoose model representing the Blog entity in the database.
 * - `TBlog`: The TypeScript type representing the shape of a Blog object.
 */
import QueryBuilder from "../../builder/QueryBuilder";
import Blog from "./blog.model";
import { TBlog } from "./blog.types";

/**
 * Service function to create a new blog.
 * 
 * This function accepts a payload representing the blog data, creates a new blog document in the database,
 * and returns the created blog.
 * 
 * @param payload - The data for the new blog to be created.
 * @returns The created blog document.
 */
export const createBlogService = async(payload: TBlog) => {
    const blog = await Blog.create(payload);
    return blog;
}

/**
 * Service function to fetch all blogs with query support.
 * 
 * This function allows filtering, sorting, and searching blogs based on query parameters passed.
 * It uses the `QueryBuilder` class to build the query and execute it with the specified conditions.
 * 
 * @param query - The query parameters used for filtering, sorting, and searching the blogs.
 * @returns An array of blogs that match the query conditions.
 */
export const getAllBlogsService = async(query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find().populate('author', 'name email'), query)
        .search(['title', 'content'])
        .sort()
        .filter();

    const blogs = await blogQuery.modelQuery;
    return blogs;
}

/**
 * Service function to update an existing blog.
 * 
 * This function accepts the blog ID and the data to update. It finds the blog by ID and updates it with the
 * provided payload, returning the updated blog.
 * 
 * @param id - The ID of the blog to be updated.
 * @param payload - The data to update the blog with.
 * @returns The updated blog document.
 */
export const updateBlogService = async(id: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return blog;
}

/**
 * Service function to delete a blog.
 * 
 * This function accepts the blog ID and deletes the corresponding blog document from the database.
 * 
 * @param id - The ID of the blog to be deleted.
 * @returns The deleted blog document.
 */
export const deleteBlogService = async(id: string) => {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}