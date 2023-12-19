import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
    return (
        <div className="flex flex-col p-6 gap-4 h-full">
            <h1 className="text-center text-3xl font-bold">Kategori</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link
                    className="bg-green-500 text-white flex flex-col items-center gap-2 p-4 w-80 sm:w-60 h-60 sm:h-72 rounded-2xl hover:bg-green-700 hover:shadow-xl hover:shadow-green-500 transition duration-300"
                    href={"/home"}
                >
                    <Image
                        className="w-20"
                        src="/pngtree-library-reading-student-png-image_5420476.png"
                        alt="gambar"
                        width={180}
                        height={37}
                    />
                    <h2 className="text-center text-xl font-semibold">Buku Pelajaran</h2>
                    <p className="text-center">Semua buku di sini memiliki materi yang lengkap untuk kalian yang selalu ingin mengembangkan diri</p>
                </Link>
            </div>
        </div>
    )
}

export default CategoryPage;