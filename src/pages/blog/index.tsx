import Link from "next/link";
import { useEffect, useState } from "react";

type Data = {
    id: number
    title: string
    date: string
    news: string
}

const BlogPage = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/blogs`)
            .then((res) => res.json())
            .then((response) => setBlogs(response.data))
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <div className="flex flex-col px-6 sm:px-8 py-8 gap-6 h-full">
            <h1 className="text-center text-3xl font-bold border-b-8 border-neutral-400 pb-4">Blog</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                {blogs.map((blog: Data) => (
                    <Link
                        className="bg-green-500 text-white flex flex-col gap-2 p-4 w-80 sm:w-60 h-60 sm:h-72 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-green-500 transition duration-300"
                        href={"/home"}
                        key={blog.id}
                    >
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <p className="bg-cyan-700 rounded-3xl text-sm px-2 py-1 w-fit">{blog.date}</p>
                        <p className="pb-4">{blog.news}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogPage;