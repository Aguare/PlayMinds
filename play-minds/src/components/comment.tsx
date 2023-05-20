import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsReply } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'
import axios from 'axios'
import { Comment } from '../models/Entitys/Comment'

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await axios.get('URL_DEL_API') // Cambiar por la URL de tu API
      setComments(response.data)
    } catch (error) {
      console.error('Error al obtener los comentarios:', error)
    }
  }

  return (
    <div>
      {comments.map((comment) => (
        <ul key={comment.comment}>
          <li>
            <div className="relative mx-auto max-w-2xl bg-gray-100 p-6 rounded-lg mb-6 drop-shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dashed border-gray-500/20 pb-6 mb-6">
                <div className="flex items-start gap-x-4">
                  <img
                    src="https://img.freepik.com/foto-gratis/primer-plano-joven-exitoso-sonriendo-camara-pie-traje-casual-contra-fondo-azul_1258-66609.jpg?w=1800&t=st=1674767726~exp=1674768326~hmac=61dcd61cc7f2f4d739abe760c144b25b58dbc8a9c9be9f914d38d4df8623659a"
                    className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300 mt-1"
                  />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {comment.user_email}
                    </span>
                    <p className="text-gray-500 text-sm">Hace 25 minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  <button className="text-lg hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <BsReply />
                  </button>
                  <button className="text-lg hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>

              <div>
                <p>{comment.comment}</p>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Comments
