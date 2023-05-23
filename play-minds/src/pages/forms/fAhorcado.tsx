import NavBar from '../../components/navbar'
import React, { FormEvent } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Game } from '../../models/Entitys/Game'
import { Phrase } from '../../models/Entitys/Phrase'
import { User } from '../../models/Entitys/User'
import { HangedGame } from '../../models/Entitys/Assistant/HangedGame'
import { Request } from '../../helpers/requests'

const AhorcadoF = () => {
  const [palabra, setPalabra] = useState<string>('')
  const [name_game, setName_game] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [value_points, setValue_points] = useState<string>('')
  const [pista, setPista] = useState<string>('')
  const [palabras, setPalabras] = useState<
    { palabra: string; pista: string }[]
  >([])
  const [error, setError] = useState<string>('')

  const handlePalabraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPalabra(event.target.value)
    setError('')
  }

  const handlePistaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPista(event.target.value)
    setError('')
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName_game(event.target.value)
    setError('')
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value)
    setError('')
  }
  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue_points(event.target.value)
    setError('')
  }
  const handleAgregarPalabra = () => {
    if (!palabra || !pista) {
      setError('Por favor ingrese la palabra y la pista')
      return
    }
    setPalabras(palabras.concat({ palabra, pista }))
    setPalabra('')
    setPista('')
    setError('')
  }
  const handleAgregarName = () => {
    if (!name_game) {
      setError('Por favor ingrese el nombre del juego')
      return
    }
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Obtener los datos del usuario desde el localStorage
    const userString = localStorage.getItem('user')
    let user
    if (userString) {
      user = JSON.parse(userString)
    } else {
      // Manejar el caso cuando los datos del usuario no están disponibles

      return
    }

    // Crear el objeto de tipo User con los datos obtenidos del localStorage
    const userObject = new User(
      user.email,
      user.name,
      '',
      user.role,
      user.points,
    )

    const game = new Game(
      '',
      name_game,
      'HANGED',
      description,
      parseInt(value_points),
      userObject,
    )

    const phrasesArray = palabras.map(
      (p, i) => new Phrase(i + 1, p.palabra, p.pista),
    )
    const hangedGame = new HangedGame(game, phrasesArray)

    try {
      // Realizar la solicitud POST
      const response = await axios.post(
        Request.REGISTER_HANGED_GAME,
        hangedGame,
      )

      // Manejar la respuesta del servidor
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">Ahorcado</span>
          </h1>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 py-10 px-8 bg-[white] rounded-md border-t-4 sm:text-base text-xs border-mainorange">
            <div className="grid sm:col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Nombre personalizado del juego"
                  value={name_game}
                  onChange={handleNameChange}
                  required
                />
                <label
                  htmlFor="name"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Nombre personalizado del juego
                </label>
              </div>
            </div>
            <div className="grid sm:col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Descripcion del juego"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
                <label
                  htmlFor="description"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Descripcion del juego
                </label>
              </div>
            </div>
            <div className="grid sm:col-span-2 ">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="value_points"
                  id="value_points"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Puntos del juego"
                  value={value_points}
                  onChange={handlePointsChange}
                  required
                />
                <label
                  htmlFor="value_points"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Puntos del juego
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="word"
                  id="word"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la palabra a adivinar"
                  value={palabra}
                  onChange={handlePalabraChange}
                  required
                />
                <label
                  htmlFor="word"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Palabra o frase a adivinar
                </label>
              </div>
            </div>

            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="hint"
                  id="hint"
                  className="peer block w-full border-0 p-0  text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese una pista"
                  value={pista}
                  onChange={handlePistaChange}
                  required
                />
                <label
                  htmlFor="hint"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pista
                </label>
              </div>
            </div>
            <span className="text-red-500">{error}</span>
            <div className="sm:col-span-2 w-[100%] ">
              <button
                type="button"
                className="bg-maincian text-white w-[100%] py-2 px-6 rounded-md hover:bg-mainorange transition-colors mr-2"
                onClick={handleAgregarPalabra}
              >
                Agregar palabra y pista
              </button>
            </div>
            <div className="sm:col-span-2 mt-4 w-[100%]">
              {palabras.map((p, i) => (
                <div key={i} className="bg-gray-100 rounded-md mt-2 p-2">
                  <p className="font-bold">{p.palabra}</p>
                  <p>{p.pista}</p>
                </div>
              ))}
            </div>
            <div className="sm:col-span-2 w-[100%]">
              <button
                type="submit"
                className="mt-4 bg-mainblue text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors w-[100%]"
                onClick={handleSubmit}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AhorcadoF
