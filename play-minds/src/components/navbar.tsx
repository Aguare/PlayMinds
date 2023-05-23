import Image from 'next/image'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { User } from '../models/Entitys/User'
import img1 from '../image/logo playminds.png'
import axios from 'axios'
import { Request } from '@/helpers/requests'

const NavBar = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }
  }, [])

  const handleLogout = () => {
    axios.get(Request.SERVER + '/Users/Logout?email=' + user?.email)
    localStorage.clear() // Elimina los datos
    router.push('/auth/signin') // Redirige al usuario
  }

  const handlehome = () => {
    axios
      .get(Request.SERVER + '/Users/GetUser?email=' + user?.email)
      .then((response) => {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
    router.push('/home') // Redirige al usuario
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleCreateGame = () => {
    if (user?.role === 'TEACHER') {
      // Aquí puedes agregar la lógica para redirigir al usuario a la ruta de creación de juegos
      console.log('Redirigir a la página de creación de juegos')
    }
  }

  return (
    <div className="w-full bg-[#112B3C] rounded-lg p-7 sm:flex sm:justify-between gap-4 sm:h-[90px] grid md:grid-cols-1 ">
      <div className="bg-red flex items-center gap-2 w-[200px]">
        <Image src={img1} alt="Imagen de logo" onClick={handlehome} />
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

      <div className="flex items-center gap-2">
        <a
          href="/home"
          className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faBell} className="text-[#EFEFEF]" />
        </a>
        <FontAwesomeIcon icon={faUser} className="text-[#EFEFEF]" />
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={toggleDropdown}
        >
          {user && (
            <div>
              <span className="text-white">{user.name}</span>
              {dropdownOpen && (
                <div className="absolute bg-gray-800 p-2 rounded-lg top-[32px] right-0 z-10">
                  <p
                    className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg transition-colors cursor-pointer"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </p>
                  {user.role === 'TEACHER' && (
                    <p
                      className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg transition-colors cursor-pointer"
                      onClick={handleCreateGame}
                    >
                      Crear juego
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {user && (
          <a className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg transition-colors">
            {user.points} pts
          </a>
        )}
      </div>
    </div>
  )
}

export default NavBar
