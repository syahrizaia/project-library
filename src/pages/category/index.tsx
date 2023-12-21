import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";
import Load from "@/components/layouts/Load";

export type Data = {
    id: string
    image: string
    title: string
    explanation: string
}

const CategoryPage = () => {
    // const { data, error, isLoading } = useSWR("/api/categories", fetcher)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/categories`)
            .then((res) => res.json())
            .then((response) => setCategories(response.data))
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <div className="flex flex-col p-6 gap-4 h-full">
            {categories.length > 0 ? (
                <>
                    <h1 className="text-center text-3xl font-bold">Kategori</h1>
                    <p className="text-center font-semibold">Semua variasi dan genre buku ada di sini WIR!</p>
                    <div className="flex flex-wrap justify-center items-center gap-6 py-4">
                        {categories.map((category: Data) => (
                            <Link
                                className="bg-green-500 text-white flex flex-col items-center gap-2 p-4 w-80 sm:w-60 h-80 sm:h-80 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                href={'/category/${category.id}'}
                                key={category.id}
                            >
                                <img
                                    className="w-20"
                                    src={category.image}
                                    alt={category.title}
                                    width={180}
                                    height={37}
                                />
                                <h2 className="text-center text-xl font-semibold">{category.title}</h2>
                                <p className="text-center">{category.explanation}</p>
                            </Link>
                        ))}
                    </div>
                </>
            ) : ( <Load /> )}
        </div>
    )
}

export default CategoryPage;