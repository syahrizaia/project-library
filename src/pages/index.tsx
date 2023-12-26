import Image from "next/image"
import Link from "next/link"

const HomePage = () => {
  return(
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 pt-40 sm:pt-20 pb-10 px-4 sm:px-20 h-full sm:h-screen">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 w-full sm:w-1/2">
        <h2 className="text-green-500">Perpustakaan WIR</h2>
        <h1 className="text-4xl sm:text-5xl">Untuk Semua Kebutuhan Membaca</h1>
        <p>Perpustakaan WIR adalah tempat membaca buku terbaik yang berada di Cikarang. Semua pilihan buku tersedia untuk kalian yang gemar membaca.</p>
        <Link
          className="bg-green-500 text-white rounded-2xl p-2 sm:px-4 hover:bg-green-700 hover:shadow-lg hover:shadow-neutral-500 transition duration-300"
          href={"/404"}
        >
          Selebihnya
        </Link>
      </div>
      <Image
        className="w-1/2 sm:w-1/3"
        src="/pngtree-library-reading-student-png-image_5420476.png"
        alt="gambar"
        width={180}
        height={37}
      />
    </div>
  )
}

export default HomePage;