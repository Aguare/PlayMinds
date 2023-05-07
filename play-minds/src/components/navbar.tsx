import Image from 'next/image'
import img1 from '../image/logo playminds.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  return (
    <div className="w-full bg-[#112B3C] rounded-lg p-7 sm:flex sm:justify-between gap-4 sm:h-[90px] grid md:grid-cols-1 ">
      <div className="bg-red flex items-center gap-2 w-[200px]">
        <a href="/">
          <Image src={img1} alt="Imagen de logo" />
        </a>
      </div>
      <div className="">
        <form className="col-span-4 flex items-center justify-center gap-2 w-[70%] sm:w-[100%]">
          <input
            type="text"
            className="w-full bg-gray-100 outline-none p-2 rounded-lg"
            placeholder="Buscar sala de juego"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
      <nav className="md:col-span-6 flex justify-end flex flex-col gap-4 sm:flex-row">
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg hover:bg-[#F66B0E] transition-colors"
        >
          Ingenieria
        </a>
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg hover:bg-[#F66B0E] transition-colors"
        >
          Derecho
        </a>
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg hover:bg-[#F66B0E] transition-colors"
        >
          Economicas
        </a>
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg hover:bg-[#F66B0E] transition-colors"
        >
          Medicina
        </a>
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg hover:bg-[#F66B0E] transition-colors"
        >
          Otros
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <a
          href="#"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faBell} className="text-[#EFEFEF]" />
        </a>
        <div className="flex items-center gap-2 cursor-pointer ">
          <div className="relative ">
            <img
              src="https://img.freepik.com/foto-gratis/joven-mujer-colombiana-atractiva-gafas-sol-posando-mientras-pie-junto-al-mar-dia_181624-41580.jpg?w=1800&t=st=1674592279~exp=1674592879~hmac=1276990bc65161f9f68c332774d2e5446f0b6b00d1d865b72e71e8732a58d9f7"
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="absolute bg-green-600 w-1.5 h-1.5 top-0 right-0.5 rounded-full ring-2 ring-white"></span>
          </div>
          <a className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg  transition-colors ">
            1,751 pts
          </a>
        </div>
      </div>
    </div>
  )
}
export default NavBar
