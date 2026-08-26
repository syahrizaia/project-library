import { useEffect, useState } from "react";
import Link from "next/link";
import Load from "@/components/layouts/Load";

type Data = {
    id: string
    image: string
    date: string
    title: string
    news: string
}

const BlogPage = () => {
    const [blogs, setBlogs] = useState([])
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/blogs`)
            .then((res) => res.json())
            .then((response) => setBlogs(response.data))
            .catch((error) => {
                console.error(error)
                setHasError(true)
            })
        }
    }, [])

    return (
        <main className="flex flex-col gap-6 px-6 md:px-12 pt-36 md:pt-28 pb-16 min-h-screen">
            {blogs.length > 0 ? (
                <section className="flex flex-col items-center">
                    <h1 className="text-center text-3xl font-bold border-b-4 border-green-500 pb-2 mb-8 w-fit">Blog WIR!</h1>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {blogs.map((blog: Data) => (
                            <Link
                                className="bg-green-500 text-white flex flex-col gap-2 p-2 w-80 sm:w-60 h-80 sm:h-80 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                href={`/blog/${blog.id}`}
                                key={blog.id}
                            >
                                <img
                                    className="h-40 w-full object-cover rounded-t-xl"
                                    src={blog.image}
                                    alt={`Gambar berita: ${blog.title}`}
                                    loading="lazy"
                                />
                                <p className="bg-cyan-700 rounded-3xl text-sm px-2 py-1 w-fit relative bottom-5">{blog.date}</p>
                                <h2 className="text-lg font-semibold px-2 relative bottom-5">{blog.title}</h2>
                                <p className="text-sm px-2 pb-4 relative bottom-5">{blog.news}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            ) : hasError ? (
                <div className="text-center text-red-500">Gagal memuat data blog. Silakan coba lagi.</div>
            ) : ( <Load /> )}
        </main>
    )
}

export default BlogPage;