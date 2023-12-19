import Image from "next/image";

const ContactPage = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center px-4 py-6 gap-10 h-full sm:h-screen">
            <form
                className="flex flex-col text-center gap-4 w-full sm:w-1/2"
                action=""
                method="post"
            >
                <h1 className="text-3xl font-bold">Kritik & Saran</h1>
                Nama
                <input
                    className="bg-neutral-400 rounded-3xl p-2"
                    type="text"
                    name=""
                    id=""
                />
                Email
                <input
                    className="bg-neutral-400 rounded-3xl p-2"
                    type="email"
                    name=""
                    id=""
                />
                Nomor Telepon
                <input
                    className="bg-neutral-400 rounded-3xl p-2"
                    type="text"
                    name=""
                    id=""
                />
                Pesan
                <input
                    className="bg-neutral-400 rounded-3xl p-2"
                    type="text"
                    name=""
                    id=""
                />
            </form>
            <Image
                className="w-2/3 sm:w-1/3"
                src="/pngtree-library-reading-student-png-image_5420476.png"
                alt="gambar"
                width={180}
                height={37}
            />
        </div>
    )
}

export default ContactPage;