import { Link } from "react-router-dom"
import Avater from "./Avater"

const BlogsNaveBar = () => {
  return (
    <>
        <div className="bg-slate-50 flex justify-between p-4">
          <Link to={'/blogs'}>
            <div className="font-bold text-2xl cursor-pointer">Medium</div>
          </Link>
            <div className="flex">
               <Link to={"/CreateNewBlogs"} className="flex justify-center items-center bg-zinc-900 text-white mr-5 px-4 rounded-full">
               <div >
                    Create New+ 
               </div>
               </Link>
                <Avater name="Siddhesh" type="big" />
            </div>
        </div>
    </>
  )
}

export default BlogsNaveBar