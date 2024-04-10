import BlogsCard from "../components/BlogsCard";
import BlogsNaveBar from "../components/BlogsNaveBar";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <>
      <div>
        <BlogsNaveBar />
        {loading && 
          <div className="flex justify-center w-1/2">
          <div>
            <div role="status" className="bg-gray-100 p-4 animate-pulse">
              
                <div className="h-8 w-8 mr-1 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
                
            </div>
          </div>
        </div>
        
          }
        {blogs && blogs.map((blog) => (
          <BlogsCard
          id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "ABC"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd December 2024"}
          />
        ))}
      </div>
    </>
  );
};

export default Blogs;
