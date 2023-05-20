import NavBar from '../../components/navbar'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Game } from '@/models/Entitys/Game'
import { User } from '../../models/Entitys/User'
import { Imag } from '@/models/Entitys/Imag'
import { MemoryGame } from '@/models/Entitys/Assistant/MemoryGame'

const MemorizeF = () => {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [name_game, setName_game] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [value_points, setValue_points] = useState<string>('')
  const [userEmail, setUserEmail] = useState('')
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files)
  }
  const [error, setError] = useState<string>('')

  const handleRemove = (index: number) => {
    const newUploadedFiles = [...uploadedFiles]
    newUploadedFiles.splice(index, 1)
    setUploadedFiles(newUploadedFiles)
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

  const getUserEmail = () => {
    // Lógica para obtener el correo del usuario logeado

    // Actualizar el estado con el correo del usuario
    setUserEmail('marcosy300@gmail.com')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Verifica que se haya seleccionado un archivo
    if (!selectedFile) {
      return
    }

    // Crea un objeto FormData para enviar la imagen al servidor
    const formData = new FormData()
    formData.append('image', selectedFile[0])

    // Realiza la subida de la imagen primero
    try {
      const response = await axios.post(
        'https://23a0-181-174-107-182.ngrok-free.app/Games/RegisterMemoryGame',
        formData,
      )
      const imagePath = response.data.path // Obtiene la ruta de la imagen subida desde la respuesta
      const image = new Imag(imagePath, false) // Crea una instancia de la clase Image

      // Crea un objeto User con el correo del usuario logeado (suponiendo que ya tienes esa información)

      // Obtenemos el correo del usuario logeado
      getUserEmail()

      // Crear el objeto de tipo HangedGame
      const user = new User(userEmail, '', '', '', 0)
      // Crea un objeto Game utilizando los datos del formulario y los modelos
      const game = new Game(
        '',
        name_game,
        'MEMORY',
        description,
        parseInt(value_points),
        user,
      )

      // Crea un objeto MemoryGame con el objeto Game y la lista de imágenes
      const memoryGame = new MemoryGame(game, [image])

      // Realiza el POST a la API con los datos del juego
      const apiResponse = await axios.post('/games', memoryGame) // Ajusta la URL de la API de creación de juegos

      console.log(apiResponse.data) // Puedes hacer algo con la respuesta de la API si es necesario

      // ...
    } catch (error) {
      console.error(error)
      // Maneja el error de acuerdo a tus necesidades
    }
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">Memoria</span>
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
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="image">Seleccione una imagen:</label>
                  <input type="file" id="image" onChange={handleFileChange} />
                </div>
                {selectedFile && (
                  <div>
                    <Image
                      src={URL.createObjectURL(selectedFile[0])}
                      alt="Imagen seleccionada"
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

export default MemorizeF
