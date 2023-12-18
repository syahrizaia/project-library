"use client"
import { useEffect, useState } from "react";

type Data = {
    id: number
    author: string
    date: string
    article: string
}

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    
    // useEffect(() => {
    //     fetchData()
    //  }, [])
     
    // const fetchData = async() => {
    //     await fetch(process.env.NEXT_PUBLIC_API${"/api/blogs"})
    // }

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL;
        if (apiUrl) {
            fetch(`${apiUrl}/api/blogs`)
            .then((res) => res.json())
            .then((response) => setBlogs(response.data))
        }
    }, [])

    console.log('blog',blogs)

    return (
        <div className="flex flex-col px-6 sm:px-8 py-8 gap-6 h-full">
            <h1 className="text-3xl font-bold">Blog</h1>
            {blogs.map((blog: Data) => (
                <div
                    className="flex flex-col gap-2 border-b-2 border-neutral-400"
                    key={blog.id}
                >
                    <h2 className="text-xl font-semibold">{blog.author}</h2>
                    <p className="text-sm">{blog.date}</p>
                    <p>{blog.article}</p>
                </div>
            ))}
        </div>
    )
}

export default BlogPage;