import NavBar from '../../components/navbar'
import { useState } from 'react'

const MemorizeF = () => {
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Verifica que se haya seleccionado un archivo
    if (!selectedFile) {
      return
    }

    // Agrega la imagen seleccionada al array de imágenes subidas
    setUploadedFiles([...uploadedFiles, selectedFile[0]])

    // Crea un objeto FormData para enviar la imagen al servidor
    const formData = new FormData()
    formData.append('image', selectedFile[0])

    // Envía la imagen al servidor utilizando fetch o axios
    // ...
  }

  const handleRemove = (index: number) => {
    const newUploadedFiles = [...uploadedFiles]
    newUploadedFiles.splice(index, 1)
    setUploadedFiles(newUploadedFiles)
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline text-maincian">
            Creando<span className="text-sm text-mainorange">Memoria</span>
          </h1>
          <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-mainorange">
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
              <button
                type="submit"
                className="mt-4 bg-maincian text-white py-2 px-6 rounded-md hover:bg-mainorange transition-colors "
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
