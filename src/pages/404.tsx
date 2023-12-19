import Image from "next/image";

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
            <h1 className="text-center text-3xl font-semibold">Halamannya ga ada WIR!</h1>
        </div>
    )
}

export default Custom404;