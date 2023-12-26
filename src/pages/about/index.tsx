import Image from "next/image"
import Link from "next/link"

const AboutPage = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 pt-40 sm:pt-20 pb-10 px-4 sm:px-20 h-full sm:h-screen">
            <Image
                className="w-3/4 sm:w-1/2"
                src="/hero3.png"
                alt="gambar"
                width={180}
                height={37}
            />
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 w-full">
                <h1 className="text-2xl sm:text-3xl font-bold">Tentang Perpustakaan WIR</h1>
                <p>Perpustakaan WIR yang berlokasikan di Negeri Wakanda cabang Cikarang melewati planet Bekasi. Yang dikelola oleh tiga mahasiswa ternama, Muhammad Faaiz Anugrah (Programmer dan Filsuf terkenal), Syahriza Ikhsan Alsistani (CEO Google katanya mah), dan Bintang Angga Pratama (Atlet Badminton gagal tenar).</p>
                <Link
                className="bg-green-500 text-white rounded-2xl p-2 sm:px-4 hover:bg-green-700 hover:shadow-lg hover:shadow-neutral-500 transition duration-300"
                href={"/404"}
                >
                Selengkapnya
                </Link>
            </div>
        </div>
    )
}

export default AboutPage;