import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
            <Image
                className="w-60"
                src={"/undraw_void_3ggu.png"}
                alt="404"
                width={180}
                height={37}
            />
            <div className="flex flex-col items-center gap-2">
                <p className="text-center text-2xl font-semibold">404</p>
                <hr className="border-b-2 border-cyan-500 w-full" />
                <h1 className="text-center text-3xl font-semibold">Halamannya ga ada WIR!</h1>
            </div>
            <Link
                className="bg-green-500 text-white rounded-2xl px-4 py-2 hover:bg-green-700 hover:shadow-lg hover:shadow-neutral-500 transition duration-300"
                href={"/"}
            >
                Kembali
            </Link>
        </div>
    )
}

export default Custom404;