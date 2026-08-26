import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Load from "@/components/layouts/Load";

type Data = {
    id:string
    image: string
    title: string
    explanation: string
}

const DetailCategoryPage = () => {
    // const { data, error, isLoading } = useSWR('/api/categories/${query.category}', fetcher)

    const { query } = useRouter()

    const [detail_categories, setDetailCategories] = useState([])
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/detail_categories`)
            .then((res) => res.json())
            .then((response) => setDetailCategories(response.data))
            .catch((error) => {
                console.error(error)
                setHasError(true)
            })
        }
    }, [])

    return (
        <>
            {detail_categories.length > 0 ? (
                <main className="flex flex-col justify-center items-center gap-6 pt-36 md:pt-28 pb-16 min-h-screen">
                    <h1 className="text-center text-3xl font-bold border-b-4 border-green-500 pb-2 mb-8 w-fit">{query.category}</h1>
                    <section className="flex flex-col lg:flex-row justify-center items-center gap-6 py-2">
                        {detail_categories.map((category: Data) => (
                            <div
                                className="bg-green-500 text-white flex flex-col items-center gap-2 p-4 w-80 sm:w-3/4 lg:w-1/3 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                key={category.id}
                            >
                                <img
                                    className="w-60 object-contain"
                                    src={category.image}
                                    alt={`Gambar ilustrasi detail kategori: ${category.title}`}
                                    width={180}
                                    height={37}
                                    loading="lazy"
                                />
                                <h2 className="text-center text-2xl font-semibold">{category.title}</h2>
                                <p className="text-center">{category.explanation}</p>
                            </div>
                        ))}
                    </section>
                </main>
            ) : hasError ? (
                <div className="text-center text-red-500 pt-36 pb-10">Gagal memuat detail kategori. Silakan coba lagi.</div>
            ) : ( <Load /> )}
        </>
    )
}

export default DetailCategoryPage;