import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Request } from '@/helpers/requests'
import { User } from '../models/Entitys/User'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Swal from 'sweetalert2'

const NewComment = () => {
  const [rows, setRows] = useState<number>(4)
  const [comment, setComment] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const game_id_game = router.query.id
  console.log(game_id_game)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }
  }, [])

  const handleCommentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setComment(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const userData = localStorage.getItem('user')
    if (!userData) {
      console.error('No se encontró información del usuario en localStorage')
      return
    }

    const parsedUser = JSON.parse(userData)
    const user_email = parsedUser.email

    const currentDate = new Date()
    const date_comment = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS")

    const newComment = {
      id_comment: 0,
      game_id_game,
      user_email,
      comment,
      date_comment,
    }
    console.log(newComment)

    // POST utilizando Axios
    axios
      .post(Request.REGISTER_COMMENT, newComment)
      .then((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ingreso correctamente el comentario',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.error('Error al enviar el comentario', error)
      })

    setComment('')
  }

  return (
    <div className="relative mt-4 bg-gray-100 p-6 rounded-lg drop-shadow-xl w-[100%] border-2">
      <h1>Ingresa un comentario</h1>
      <form>
        <textarea
          id="message"
          rows={rows}
          name="comment"
          className="block p-2.5 w-full text-sm text-gray-900 bg-[white] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Deja un comentario..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>

        <button
          className="text-center p-4 pl-8 pr-8 bg-mainblue rounded-lg mt-4 text-[white] font-semibold hover:bg-mainorange"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default NewComment
