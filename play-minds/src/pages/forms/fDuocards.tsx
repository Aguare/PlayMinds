import { useState, ChangeEvent, useEffect } from 'react'
import axios from 'axios'
import { Game } from '../../models/Entitys/Game'
import { Imag } from '../../models/Entitys/Imag'
import { Card } from '@/models/Entitys/Card'
import { User } from '../../models/Entitys/User'
import { CardGameG } from '@/models/Entitys/Assistant/CardGameG'

const DuoCardsForm = () => {
  const [pregunta, setPregunta] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [pista, setPista] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [respuestaCorrecta, setRespuestaCorrecta] = useState<boolean>(false)
  //
  const [name_game, setName_game] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [value_points, setValue_points] = useState<string>('')
  const [userEmail, setUserEmail] = useState('')
  const [listcards] = useState<Imag[]>([])
  const [respuestas] = useState<number[]>([])

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
  //
  const [cartas, setCartas] = useState<
    {
      pregunta: string
      pista: string
      imagen: string
      respuestaCorrecta: boolean
    }[]
  >([])
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files)
  }

  const handlePreguntaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPregunta(event.target.value)
    setError('')
  }

  const handlePistaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPista(event.target.value)
    setError('')
  }

  const getUserEmail = () => {
    // Lógica para obtener el correo del usuario logeado

    // Actualizar el estado con el correo del usuario
    setUserEmail('marcosy300@gmail.com')
  }

  const handleImage = async () => {
    // Verifica que se haya seleccionado un archivo
    if (!selectedFile) {
      return
    }

    // Agrega la imagen seleccionada al array de imágenes subidas
    setUploadedFiles([...uploadedFiles, selectedFile[0]])

    // Crea un objeto FormData para enviar la imagen al servidor
    const formData = new FormData()
    formData.append('files', selectedFile[0])

    // Envía la imagen al servidor
    try {
      // Realiza la solicitud POST al API utilizando Axios
      const response = await axios.post(
        'https://3e8b-181-174-107-182.ngrok-free.app/Files/upload',
        formData,
      )
      console.log(response.data)
      listcards.push(response.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = (index: number) => {
    const newUploadedFiles = [...uploadedFiles]
    newUploadedFiles.splice(index, 1)
    setUploadedFiles(newUploadedFiles)
  }

  const handleAgregarDuoCard = () => {
    if (!pregunta || uploadedFiles.length === 0 || !pista) {
      setError('Por favor ingrese la pregunta, la imagen y la pista')
      console.log(pregunta, pista, respuestaCorrecta)
      return
    }
    if (respuestaCorrecta) {
      respuestas.push(1)
    } else {
      respuestas.push(0)
    }
    const nuevaCarta = {
      pregunta,
      pista,
      imagen: URL.createObjectURL(uploadedFiles[0]),
      respuestaCorrecta,
    }

    setCartas([...cartas, nuevaCarta])
    console.log(pregunta, pista, respuestaCorrecta)
    setPregunta('')
    setSelectedFile(null)
    setUploadedFiles([])
    setPista('')
    setError('')
  }

  const handleGameCreation = async () => {
    const user = new User(userEmail, '', '', 'STUDENT', 0)
    const game = new Game(
      '',
      name_game,
      'CARD',
      description,
      parseInt(value_points),
      user,
    )

    const cards: Card[] = []
    cartas.forEach((carta, index) => {
      let res: boolean = respuestas[index] === 1 ? true : false
      const card = new Card(
        0,
        carta.pregunta,
        listcards[index],
        carta.pista,
        res,
      )
      cards.push(card)
    })

    const cardGameG = new CardGameG(game, cards)
    try {
      const response = await axios.post(
        'https://3e8b-181-174-107-182.ngrok-free.app/Games/RegisterCardGame',
        cardGameG,
      )
      console.log(response.data)
      console.log(cardGameG)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Obtenemos el correo del usuario logeado
    getUserEmail()

    // Sube la imagen al servidor
    await handleImage()

    // Crea el juego
    // handleGameCreation()
  }

  return (
    <div>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">DuoCards</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-10 px-8 bg-[white] rounded-md border-t-4 border-mainorange">
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
                  name="pregunta"
                  id="pregunta"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la pregunta"
                  value={pregunta}
                  onChange={handlePreguntaChange}
                  required
                />
                <label
                  htmlFor="pregunta"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pregunta
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="text"
                  name="pista"
                  id="pista"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Ingrese la pista"
                  value={pista}
                  onChange={handlePistaChange}
                  required
                />
                <label
                  htmlFor="pista"
                  className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                >
                  Pista
                </label>
              </div>
            </div>
            <div className="grid sm:col-span-2 ">
              <div className="bg-white flex min-h-[60px] justify-around rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <div className="flex flex-row-reverse justify-center border-r-2 w-[100%]">
                  <input
                    type="radio"
                    name="respuestaCorrecta"
                    id="respuestaVerdadera"
                    checked={respuestaCorrecta === true}
                    onChange={() => setRespuestaCorrecta(true)}
                  />
                  <label htmlFor="respuestaVerdadera" className="p-4">
                    Verdadero
                  </label>
                </div>
                <div className="flex flex-row-reverse justify-center w-[100%]">
                  <input
                    type="radio"
                    name="respuestaCorrecta"
                    id="respuestaFalsa"
                    checked={respuestaCorrecta === false}
                    onChange={() => setRespuestaCorrecta(false)}
                  />
                  <label htmlFor="respuestaFalsa" className="p-4">
                    Falso
                  </label>
                </div>
              </div>
            </div>

            <div className="grid">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="image">Seleccione una imagen:</label>
                  <input type="file" id="image" onChange={handleFileChange} />
                </div>
                {selectedFile && (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedFile[0])}
                      alt="Imagen seleccionada"
                      style={{ width: '30%' }}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="mt-4 bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors "
                >
                  Subir Imagen
                </button>
              </form>
              <div className="mt-4">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Imagen ${index + 1}`}
                        className="w-16 h-16 object-cover mr-2 mt-2"
                      />
                      <span>{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <span className="text-red-500">{error}</span>
            </div>
            <div className="sm:col-span-2">
              {cartas.map((carta, index) => (
                <div key={index} className="my-2">
                  <h2 className="font-bold text-lg">{carta.pregunta}</h2>
                  <img
                    src={carta.imagen}
                    alt={carta.pregunta}
                    className="my-2"
                    style={{ width: '10%' }}
                  />
                  <p className="text-sm">{carta.pista}</p>
                </div>
              ))}

              <button
                type="button"
                className="bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors mr-2"
                onClick={handleAgregarDuoCard}
              >
                Agregar Carta
              </button>
            </div>
            <button
              type="button"
              className="bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors mr-2"
              onClick={handleGameCreation}
            >
              CREAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DuoCardsForm
