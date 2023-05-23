import React, { useState } from 'react'
import Image from 'next/image'
import img1 from '../../image/logo playminds.png'
import axios from 'axios'
import { User } from '../../models/Entitys/User'
import { Request } from '../../helpers/requests'

const Register = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const user = new User(email, name, password, role, 0)

    console.log('Datos de usuario:', user)

    axios
      .post(Request.REGISTER_USER, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('Respuesta del servidor:', response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <div>
      <div className="min-h-screen bg-[#112B3C] grid grid-cols-1 lg:grid-cols-2">
        {/*Imagen*/}
        <div className="flex flex-col items-center justify-center sm:pl-[20%] mx-auto pad ">
          <Image src={img1} alt="Imagen de fondo" width={900} height={900} />
        </div>
        <div className="text-white flex flex-col items-center justify-center gap-8 p-8 max-w-lg mx-auto">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-4xl font-medium">Crear cuenta</h1>
            <p className="text-gray-400">Registrate en la plataforma</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-gray-200">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu nombre completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name" className="text-gray-200">
                Selecciona tu rol Docente/Estudiante
              </label>
            </div>
            <div className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400">
              <select
                className="w-full bg-[#112B3C] outline-none focus:border-indigo-400"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="STUDENT">ESTUDIANTE</option>
                <option value="TEACHER">DOCENTE</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-gray-200">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-200">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 order-2 md:order-1">
              <span className="text-gray-400">
                ¿Ya tienes cuenta?{' '}
                <a
                  href="/auth/signin"
                  className="text-indigo-400 hover:text-indigo-500 transition-colors"
                >
                  Ingresa
                </a>
              </span>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="mt-4 order-1 md:order-2">
              <button
                type="submit"
                className="w-full bg-[#205375] p-2 rounded-full hover:bg-[#F66B0E] transition-colors"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register
