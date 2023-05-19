import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import imgIngenieria from '../image/Image-carrera-inge.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Game } from '../models/Entitys/Game'

const Card = () => {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('URL_DEL_API') // Reemplaza 'URL_DEL_API' con la URL real de tu API
        setGames(response.data)
      } catch (error) {
        console.error('Error al obtener los juegos:', error)
      }
    }

    fetchGames()
  }, [])

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-8">
      {games.map((game) => (
        <div
          key={game.id_game}
          className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mx-auto pad ">
            <Image
              src={imgIngenieria}
              alt="Imagen de fondo"
              width={400}
              height={400}
            />
          </div>
          <p className="text-gray-500">{game.description}</p>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUser} className="text-[#EFEFEF]" />
            <div>
              <h3 className="text-indigo-500 font-bold">{game.user.name}</h3>
              <p className="text-gray-500 font-medium">{game.user.role}</p>
            </div>
            <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8">
              <button
                type="button"
                className="border border-gray-600 py-2 px-4 rounded-lg"
              >
                JUGAR
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
