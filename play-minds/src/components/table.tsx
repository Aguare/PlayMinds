import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '../models/Entitys/User'
import { useRouter } from 'next/router'
import { GameComplete } from '../models/Entitys/GameComplete'
import { Request } from '@/helpers/requests'

const Table = () => {
  const [user, setUser] = useState<User | null>(null)
  const [rankingData, setRankingData] = useState<GameComplete[]>([])
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }

    axios
      .get(Request.GET_RANKING_GAME + '?idGame=' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data
        console.log(data)
        const sortedData = data.sort(
          (a: GameComplete, b: GameComplete) => b.score - a.score,
        )
        setRankingData(sortedData)
      })
      .catch((error) => {
        console.error('Error al obtener los datos del ranking:', error)
      })
  }, [])

  return (
    <div className="bg-white shadow-md rounded p-4 w-[100%] sm:w-[98%]  ">
      <h2 className="text-xl font-bold mb-4">Ranking de Jugadores</h2>
      <div className="overflow-x-auto">
        <table className="w-[100%]">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Ranking</th>
              <th className="py-2 px-4">Jugador</th>
              <th className="py-2 px-4">Puntos</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {rankingData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.user}</td>
                <td className="py-2 px-4">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
