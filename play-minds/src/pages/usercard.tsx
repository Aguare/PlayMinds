import NavBar from '../components/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { User } from '../models/Entitys/User'
import { Request } from '@/helpers/requests'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const UserCard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(Request.Get_ALL_USER)
      setUsers(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setUsers(users.filter((u) => u !== user))
  }

  return (
    <div>
      <NavBar />
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full pl-5">
          {users.map((user) => (
            <div
              key={user.email}
              className={`bg-white hover:bg-cyan-600 group rounded-lg shadow hover:shadow-lg hover:shadow-mainorange transition-all hover:cursor-pointer ${
                user === selectedUser ? 'selected' : ''
              }`}
            >
              <div className="flex justify-center py-8">
                <div className="bg-[gray] text-white rounded-full w-20 h-20 flex items-center justify-center font-semibold text-xl group-hover:text-white transition-all">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[bluemain] text-5xl"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <h3 className="font-semibold text-xl group-hover:text-white transition-all">
                  {user.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300">
                  {user.role}
                </p>
                <button
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDeleteClick(user)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserCard
