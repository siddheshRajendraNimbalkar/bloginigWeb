import { BlogInterface } from "../hooks";
import BlogsNaveBar from "./BlogsNaveBar";

const FullBlog = ({blog}:{blog : BlogInterface}) => {
    return (
        <>
            <BlogsNaveBar />

            <div className="grid mt-4 grid-cols-12 px-10 w-full ">
                <div className="col-span-8 ">
                    <div className="text-3xl font-bold mb-4 text-gray-900">
                        {blog.title}
                    </div>
                    <div className="text-gray-700 font-bold">
                        {blog.content}
                    </div>  
                </div>
                <div className="col-span-4">
                    <div className="text-3xl font-bold mb-3">
                        Author
                    </div>
                    <div className="text-xl font-semibold">
                        {blog.author.name || "Anonymous"}s
                    </div>
                </div>
            </div>
        </>
    );
}

export default FullBlog;
