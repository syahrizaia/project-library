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

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_URL
        if (apiUrl) {
            fetch(`${apiUrl}/api/detail_categories`)
            .then((res) => res.json())
            .then((response) => setDetailCategories(response.data))
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])

    return (
        <>
            {detail_categories.length > 0 ? (
                <div className="flex flex-col justify-center items-center gap-6 py-6">
                    <h1 className="text-center text-3xl font-bold">{query.category}</h1>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 py-2">
                        {detail_categories.map((category: Data) => (
                            <div
                                className="bg-green-500 text-white flex flex-col items-center gap-2 p-4 w-80 sm:w-3/4 lg:w-1/3 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-neutral-500 transition duration-300"
                                key={category.id}
                            >
                                <img
                                    className="w-60"
                                    src={category.image}
                                    alt={category.title}
                                    width={180}
                                    height={37}
                                />
                                <h2 className="text-center text-2xl font-semibold">{category.title}</h2>
                                <p className="text-center">{category.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : ( <Load /> )}
        </>
    )
}

export default DetailCategoryPage;