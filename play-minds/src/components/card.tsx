import Image from 'next/image'
import imgIngenieria from '../image/Image-carrera-inge.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Card = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-8">
      <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
        <div className="flex flex-col items-center justify-center mx-auto pad ">
          <Image
            src={imgIngenieria}
            alt="Imagen de fondo"
            width={400}
            height={400}
          />
        </div>
        <p className="text-gray-500">
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
          quibusdam ducimus libero ad tempora doloribus expedita laborum saepe
          voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum,
          obcaecati corrupti aspernatur a..."
        </p>
        <div className="flex items-center gap-4">
          <img
            src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
            className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
          />
          <div>
            <h3 className="text-indigo-500 font-bold">Emilio Maldonado</h3>
            <p className="text-gray-500 font-medium">Frontend Developer</p>
          </div>
          <div className="hidden w-4/12 lg:flex justify-center sm:pl-[40%] items-center gap-8">
            <button
              type="button"
              className="border border-gray-600 py-2 px-4 rounded-lg"
            >
              JUGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
