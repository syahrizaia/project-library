import Image from "next/image"
import Link from "next/link"

const AboutPage = () => {
    return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 pt-40 md:pt-20 pb-10 px-6 md:px-20 h-full md:min-h-screen">
      <Image
                className="w-2/3 md:w-1/2 object-contain"
                src="/hero3.png"
                alt="Ilustrasi anggota perpustakaan WIR"
                width={400}
                height={400}
                priority
            />
            <section className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full">
                <h1 className="text-2xl sm:text-3xl font-bold">Tentang Perpustakaan WIR</h1>
                <p>Perpustakaan WIR yang berlokasikan di Negeri Wakanda cabang Cikarang melewati planet Bekasi. Yang dikelola oleh tiga mahasiswa ternama, Muhammad Faaiz Anugrah (Programmer dan Filsuf terkenal), Syahriza Ikhsan Alsistani (CEO Google katanya mah), dan Bintang Angga Pratama (Atlet Badminton gagal tenar).</p>
                <Link
                className="bg-green-500 text-white rounded-2xl p-2 sm:px-4 hover:bg-green-700 hover:shadow-lg hover:shadow-neutral-500 transition duration-300"
                href={"/404"}
                >
                Selengkapnya
                </Link>
            </section>
        </main>
    )
}

export default AboutPage;