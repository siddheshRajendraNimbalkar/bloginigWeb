import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface BlogInterface {
    "content":string,
    "title":string,
    "id":string,
    "author": {
        "name":string,
    }
}

export const useBlogs = () => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<BlogInterface[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
     .then((res)=>{
        setBlogs(res.data.blog);
        setLoading(false);
     });
    },[])

    return{
        loading,
        blogs
    }
}


export const useBlog = ({ id }: { id : string }) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<BlogInterface>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
     .then((res)=>{
        setBlog(res.data.blog);
        setLoading(false);
     });
    },[])

    return{
        loading,
        blog
    }
}