import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Request } from '@/helpers/requests'
import { User } from '../models/Entitys/User'
import { useRouter } from 'next/router'

const Table = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }
  }, [])

  return (
    <div className="bg-white shadow-md rounded p-4 w-80">
      <h2 className="text-xl font-bold mb-4">Ranking de Jugadores</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-2 px-4">Ranking</th>
            <th className="py-2 px-4">Jugador</th>
            <th className="py-2 px-4">Puntos</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4">Jugador 1</td>
            <td className="py-2 px-4">100</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
