import React, { useState, useEffect } from 'react'

const NewComment = () => {
  const [rows, setRows] = useState<number>(4)
  return (
    <div className="relative mt-4 bg-gray-100 p-6 rounded-lg drop-shadow-xl w-[100%] border-2">
      <h1>Ingresa un comentario</h1>
      <form>
        <textarea
          id="message"
          rows={rows}
          name="coment"
          className="block p-2.5 w-full text-sm text-gray-900 bg-[white] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Deja un comentario..."
        ></textarea>
        <button className="text-center p-4 pl-8 pr-8 bg-mainblue rounded-lg mt-4 text-[white] font-semibold hover:bg-mainorange">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default NewComment
