import Link from "next/link"

const Navbar = () => {
    return(
      <div className='bg-cyan-400 text-white flex justify-between rounded-br-2xl sm:rounded-br-3xl rounded-bl-2xl sm:rounded-bl-3xl w-full gap-3.5 sm:gap-3.5 lg:gap-96'>
        <h1 className='flex justify-center items-center px-2 sm:px-4 w-1/2 font-semibold sm:font-extrabold'>Perpustakaan WIR</h1>
        <div className='flex justify-evenly items-center w-full'>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-neutral-200 hover:text-cyan-800 px-2 sm:px-4 py-3'
            href={"/home"}
          >
            Beranda
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-neutral-200 hover:text-cyan-800 px-2 sm:px-4 py-3'
            href={"/about"}
          >
            Tentang
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-neutral-200 hover:text-cyan-800 px-2 sm:px-4 py-3'
            href={"/category"}
          >
            Kategori
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-neutral-200 hover:text-cyan-800 px-2 sm:px-4 py-3'
            href={"/blog"}
          >
            Blog
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-neutral-200 hover:text-cyan-800 px-2 sm:px-4 py-3'
            href={"/contact"}
          >
            kontak
          </Link>
        </div>
      </div>
    )
  }
  
export default Navbar;