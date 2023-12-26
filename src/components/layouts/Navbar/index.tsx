import Link from "next/link"

const Navbar = () => {
    return(
      <div className='bg-cyan-400 text-white flex flex-col sm:flex-row justify-between rounded-br-2xl sm:rounded-br-3xl rounded-bl-2xl sm:rounded-bl-3xl w-full sm:gap-3.5 xl:gap-96 fixed z-10'>
        <div className='flex justify-center items-center px-2 sm:px-4 py-2 sm:py-0 w-full sm:w-1/2'>
          <Link
            className="text-2xl font-semibold sm:font-bold"
            href={"/"}
          >
            Perpustakaan WIR
          </Link>
        </div>
        <div className='bg-cyan-500 sm:bg-cyan-500 flex justify-evenly items-center rounded-br-2xl sm:rounded-br-3xl rounded-bl-2xl sm:rounded-none px-0 w-full'>
          <Link
            className='transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-5 sm:py-8 md:py-4 rounded-bl-2xl sm:rounded-none'
            href={"/"}
          >
            Beranda
          </Link>
          <Link
            className='transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-5 sm:py-8 md:py-4'
            href={"/about"}
          >
            Tentang
          </Link>
          <Link
            className='transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-5 sm:py-8 md:py-4'
            href={"/category"}
          >
            Kategori
          </Link>
          <Link
            className='transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-5 sm:py-8 md:py-4'
            href={"/blog"}
          >
            Blog
          </Link>
          <Link
            className='transition duration-300 hover:bg-white hover:text-cyan-800 px-2 sm:px-4 py-2 sm:py-5 md:py-4 rounded-br-2xl sm:rounded-br-3xl md:rounded-br-3xl lg:rounded-none'
            href={"/cas"}
          >
            kritik & Saran
          </Link>
        </div>
      </div>
    )
  }
  
export default Navbar;