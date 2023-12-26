import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Load from "@/components/layouts/Load"

type Data = {
    id: string
    image: string
    date: string
    title: string
    news: string
}

const DetailBlogPage = () => {
    const { query } = useRouter()

    const [detail_blogs, setDetailBlogs] = useState([])

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/detail_blogs`)
            .then((res) => res.json())
            .then((response) => setDetailBlogs(response.data))
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <div className="flex flex-col gap-6 px-6 sm:px-8 pt-36 sm:pt-20 pb-10 h-full">
            {detail_blogs.length > 0 ? (
                <>
                    <h1 className="text-center text-3xl font-bold border-b-8 border-neutral-400 pb-4">{query.blog}</h1>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {detail_blogs.map((blog: Data) => (
                            <div
                                className="bg-green-500 text-white flex flex-col gap-2 p-2 w-80 sm:w-3/4 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                key={blog.id}
                            >
                                <img
                                    className="h-2/5"
                                    src={blog.image}
                                    alt={blog.title}
                                />
                                <p className="bg-cyan-700 rounded-3xl px-4 py-1 w-fit relative bottom-5">{blog.date}</p>
                                <h2 className="text-2xl font-semibold px-2 relative bottom-5">{blog.title}</h2>
                                <p className="px-2 pb-4 relative bottom-5">{blog.news}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : ( <Load /> )}
        </div>
    )
}

export default DetailBlogPage;