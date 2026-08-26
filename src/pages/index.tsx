import Image from "next/image"
import Link from "next/link"

const HomePage = () => {
  return(
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 pt-40 md:pt-20 pb-10 px-6 md:px-20 h-full md:min-h-screen">
      <section className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/2">
        <h1 className="text-green-500 text-xl md:text-2xl font-semibold">Perpustakaan WIR</h1>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">Untuk Semua Kebutuhan Membaca</h2>
        <p className="text-neutral-700 leading-relaxed max-w-lg">Perpustakaan WIR adalah tempat membaca buku terbaik yang berada di Cikarang. Semua pilihan buku tersedia untuk kalian yang gemar membaca.</p>
        <Link
          className="bg-green-500 text-white rounded-2xl p-2 sm:px-4 hover:bg-green-700 hover:shadow-lg hover:shadow-neutral-500 transition duration-300"
          href={"/404"}
        >
          Selebihnya
        </Link>
      </section>
      <Image
        className="w-2/3 md:w-1/3 object-contain"
        src="/pngtree-library-reading-student-png-image_5420476.png"
        alt="Ilustrasi mahasiswa sedang membaca buku di perpustakaan WIR"
        width={400}
        height={400}
        priority
      />
    </main>
  )
}

export default HomePage;