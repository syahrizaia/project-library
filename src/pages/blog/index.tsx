import { useEffect, useState } from "react";
import Link from "next/link";
import Load from "@/components/layouts/Load";

type Data = {
    id: number
    image: string
    date: string
    title: string
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
            {blogs.length > 0 ? (
                <>
                    <h1 className="text-center text-3xl font-bold border-b-8 border-neutral-400 pb-4">Blog WIR!</h1>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {blogs.map((blog: Data) => (
                            <Link
                                className="bg-green-500 text-white flex flex-col gap-2 p-4 w-80 sm:w-60 h-60 sm:h-80 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                href={"/404"}
                                key={blog.id}
                            >
                                <img
                                    className="h-2/5"
                                    src={blog.image}
                                    alt={blog.title}
                                />
                                <p className="bg-cyan-700 rounded-3xl text-sm px-2 py-1 w-fit relative bottom-5">{blog.date}</p>
                                <h2 className="text-lg font-semibold relative bottom-5">{blog.title}</h2>
                                <p className="text-sm pb-4 relative bottom-5">{blog.news}</p>
                            </Link>
                        ))}
                    </div>
                </>
            ) : ( <Load /> )}
        </div>
    )
}

export default BlogPage;