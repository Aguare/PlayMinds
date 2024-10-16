import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import img1 from '../../image/logo playminds.png'
import imggame1 from '../../image/img-ahorcado.png'
import imggame2 from '../../image/img-duocards.png'
import imggame3 from '../../image/img-memoria.png'
import imggame4 from '../../image/img-quiz.png'
import imggame5 from '../../image/img-kiche.png'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { User } from '../../models/Entitys/User'

const Creator = () => {
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
    localStorage.removeItem('user')
    router.push('/auth/signin')
  }

  const handleCreator = () => {
    router.push('/forms/creator')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div>
      <div className="relative md:min-h-[80vh] lg:min-h-screen py-8 px-12 bg-mainblue">
        <div className="flex items-center justify-between w-full bg-mainblue">
          <div className="w-6/12 lg:w-2/12 flex items-center gap-2">
            <Link href="/home">
              <Image src={img1} alt="Imagen de fondo" layout="responsive" />
            </Link>
          </div>
          <nav className="hidden w-6/12 lg:flex justify-center items-center gap-8 text-gray-500 font-medium"></nav>
          <div className="flex items-center gap-2">
            <button className="text-[#EFEFEF] xl:py-1 xl:px-2 rounded-lg">
              <FontAwesomeIcon icon={faBell} className="text-[#EFEFEF]" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="text-[#EFEFEF]" />
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {user && (
                    <div className="relative">
                      <span className="text-white">{user.name}</span>
                      {dropdownOpen && (
                        <div className="absolute bg-gray-800 p-2 rounded-lg top-[32px] right-0 z-10">
                          <p
                            className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg transition-colors cursor-pointer"
                            onClick={handleCreator}
                          >
                            Crear Juegos
                          </p>
                          <p
                            className="text-[#EFEFEF] text-xs xl:py-3 xl:px-2 rounded-lg transition-colors cursor-pointer"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="absolute bg-green-600 w-1.5 h-1.5 top-0 right-0.5 rounded-full ring-2 ring-white"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-10 p-8">
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-md h-full">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Image src={imggame1} alt="Imagen de Ahorcado" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 flex-grow">
              "Juego en donde el jugador debe adivinar una palabra desconocida letra por letra antes de que se complete un dibujo de un hombre ahorcado. Cada letra incorrecta agrega una parte al dibujo. Si se completa el dibujo, el jugador pierde. El objetivo es adivinar la palabra antes de que sea demasiado tarde. ¡Diviértete jugando Ahorcado!"
            </p>
            <div className="flex justify-center">
              <button type="button" className="border border-gray-600 py-2 px-4 rounded-lg">
                <Link href="/forms/fAhorcado">CREAR</Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-md h-full">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Image src={imggame2} alt="Imagen de DuoCards" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 flex-grow">
              "Juego de preguntas verdadero/falso con solo dos opciones de respuesta. Desliza a la izquierda para 'no' y a la derecha para 'sí'. Objetivo: responder la mayor cantidad de preguntas correctas antes de que se acabe el tiempo."
            </p>
            <div className="flex justify-center">
              <button type="button" className="border border-gray-600 py-2 px-4 rounded-lg">
                <Link href="/forms/fDuocards">CREAR</Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-md h-full">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Image src={imggame3} alt="Imagen de Memoria" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 flex-grow">
              "Juego memoria donde se muestran cartas boca abajo y debes voltearlas para encontrar las parejas. El jugador que encuentre más parejas en el menor tiempo posible gana. Mejora la memoria y la concentración. ¡Que gane el más rápido!"
            </p>
            <div className="flex justify-center">
              <button type="button" className="border border-gray-600 py-2 px-4 rounded-lg">
                <Link href="/forms/fMemorize">CREAR</Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-md h-full">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Image src={imggame4} alt="Imagen de Quiz" layout="responsive" width={400} height={400} />
            </div>
            <p className="text-gray-500 flex-grow">
              "Juego de quiz en línea con preguntas sobre una amplia variedad de temas. El jugador debe responder correctamente antes de que se acabe el tiempo. ¡Demuestra tus conocimientos y diviértete jugando Trivia Time!"
            </p>
            <div className="flex justify-center">
              <button type="button" className="border border-gray-600 py-2 px-4 rounded-lg">
                <Link href="/forms/fQuiz">CREAR</Link>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-md h-full">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Image src={imggame5} alt="Imagen de Idiomas" layout="responsive" width={400} height={400} />
              <span className="bg-yellow-500 text-white text-sm font-semibold rounded-full px-2 py-1 mt-2">BETA</span>
            </div>
            <p className="text-gray-500 flex-grow">
              "Este juego está en beta y está diseñado para aprender idiomas y lenguas de Guatemala como el K'iche'. El objetivo es facilitar el aprendizaje de vocabulario y gramática mediante dinámicas interactivas. ¡Pronto disponible!"
            </p>
            <div className="flex justify-center">
              <button type="button" className="border border-gray-600 py-2 px-4 rounded-lg">
                <Link href="/forms/fIdiomas">CREAR</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Creator
