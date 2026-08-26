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
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/detail_blogs`)
            .then((res) => res.json())
            .then((response) => setDetailBlogs(response.data))
            .catch((error) => {
                console.error(error)
                setHasError(true)
            })
        }
    }, [])

    return (
        <main className="flex flex-col gap-6 px-6 md:px-12 pt-36 md:pt-28 pb-16 min-h-screen">
            {detail_blogs.length > 0 ? (
                <section className="flex flex-col items-center">
                    <h1 className="text-center text-3xl font-bold border-b-4 border-green-500 pb-2 mb-8 w-fit">{query.blog}</h1>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {detail_blogs.map((blog: Data) => (
                            <div
                                className="bg-green-500 text-white flex flex-col gap-2 p-2 w-80 sm:w-3/4 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                key={blog.id}
                            >
                                <img
                                    className="h-64 w-full object-cover rounded-t-xl"
                                    src={blog.image}
                                    alt={`Gambar berita detail: ${blog.title}`}
                                    loading="lazy"
                                />
                                <p className="bg-cyan-700 rounded-3xl px-4 py-1 w-fit relative bottom-5">{blog.date}</p>
                                <h2 className="text-2xl font-semibold px-2 relative bottom-5">{blog.title}</h2>
                                <p className="px-2 pb-4 relative bottom-5">{blog.news}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : hasError ? (
                <div className="text-center text-red-500">Gagal memuat detail blog. Silakan coba lagi.</div>
            ) : ( <Load /> )}
        </main>
    )
}

export default DetailBlogPage;