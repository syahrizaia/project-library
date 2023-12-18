import Link from "next/link"

const Navbar = () => {
    return(
      <div className='bg-cyan-400 text-white flex flex-col sm:flex-row justify-between rounded-br-2xl sm:rounded-br-3xl rounded-bl-2xl sm:rounded-bl-3xl w-full gap-3.5 sm:gap-3.5 xl:gap-96'>
        <h1 className='flex justify-center items-center px-2 sm:px-4 w-full sm:w-1/2 text-2xl font-semibold sm:font-bold'>Perpustakaan WIR</h1>
        <div className='bg-cyan-500 sm:bg-cyan-500 md:bg-cyan-400 flex justify-evenly items-center rounded-br-2xl sm:rounded-br-3xl rounded-bl-2xl sm:rounded-none w-full'>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-3 sm:py-5 lg:py-4 rounded-bl-2xl sm:rounded-none'
            href={"/home"}
          >
            Beranda
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-3 sm:py-5 lg:py-4'
            href={"/about"}
          >
            Tentang
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-3 sm:py-5 lg:py-4'
            href={"/category"}
          >
            Kategori
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-3 sm:py-5 lg:py-4'
            href={"/blog"}
          >
            Blog
          </Link>
          <Link
            className='bg-cyan-500 transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-3 sm:py-5 lg:py-4 rounded-br-2xl sm:rounded-br-3xl md:rounded-none'
            href={"/contact"}
          >
            kontak
          </Link>
        </div>
      </div>
    )
  }
  
export default Navbar;