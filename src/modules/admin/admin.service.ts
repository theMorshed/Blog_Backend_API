import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Blog from "../blog/blog.model";
import User from "../user/user.model";

export const blockUserService = async(id: string) => {
    const blockedUser = await User.findById(id);
    const blocked = blockedUser?.isBlocked;
    if (blocked) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already blocked!');
    }

    const user = await User.findByIdAndUpdate(id, { isBlocked: true });
    return user;
}

export const deleteBlogService = async(id: string) => {
    const blogExists = await Blog.findById(id);
    if (!blogExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog does not exists');
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}
