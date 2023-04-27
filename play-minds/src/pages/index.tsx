import Image from 'next/image'
import { Inter } from 'next/font/google'
import img1 from '../image/logo playminds1.png'
import imgDerecho from '../image/Image-carrera-der.png'
import imgEconomicas from '../image/Image-carrera-eco.png'
import imgIngenieria from '../image/Image-carrera-inge.png'
import imgMedicina from '../image/Image-carrera-med.png'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <div className="relative md:min-h-[80vh] lg:min-h-screen py-8 px-12">
        <div className="flex items-center justify-between w-full">
          <div className="w-6/12 lg:w-2/12 flex items-center gap-2">
            <Image src={img1} alt="Imagen de fondo" />
          </div>
          <nav className="hidden w-6/12 lg:flex justify-center items-center gap-8 text-gray-500 font-medium">
            <a
              href="#"
              className="text-gray-900 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Ingenieria
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Derecho
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Economicas
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Medicina
            </a>
          </nav>
          <div className="hidden w-4/12 lg:flex justify-center items-center gap-8">
            <button type="button" className="py-2 px-4">
              <Link href="/login">Log in</Link>
            </button>
            <button
              type="button"
              className="border border-gray-600 py-2 px-4 rounded-lg"
            >
              <Link href="/register"> Sign up</Link>
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 p-8">
          {/*Juego 1*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imgDerecho}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a..."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Marcos Aguare</h3>
                <p className="text-gray-500 font-medium">Backend Developer</p>
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
          {/*Juego 2*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imgEconomicas}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a..."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Daniel Morales</h3>
                <p className="text-gray-500 font-medium">Backend Developer</p>
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
          {/*Juego 3*/}
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
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a..."
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
          {/*Juego 4*/}
          <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl drop-shadow-xl">
            <div className="flex flex-col items-center justify-center mx-auto pad ">
              <Image
                src={imgMedicina}
                alt="Imagen de fondo"
                width={400}
                height={400}
              />
            </div>
            <p className="text-gray-500">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a..."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hombre-negocios-mascarilla-usando-su-computadora-portatil-mientras-sentado-escaleras-al-aire-libre-concepto-negocio-nuevo-concepto-estilo-vida-normal_58466-14709.jpg"
                className="w-16 h-16 object-cover rounded-full ring-4 ring-gray-300"
              />
              <div>
                <h3 className="text-indigo-500 font-bold">Marco Mander</h3>
                <p className="text-gray-500 font-medium">Pensum Cheater</p>
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
      </div>
    </div>
  )
}
