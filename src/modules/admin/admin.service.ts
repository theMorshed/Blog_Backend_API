import Blog from "../blog/blog.model";
import User from "../user/user.model";

export const blockUserService = async(id: string) => {
    const user = await User.findByIdAndUpdate(id, { isBlocked: true });
    return user;
}

export const deleteBlogService = async(id: string) => {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}
