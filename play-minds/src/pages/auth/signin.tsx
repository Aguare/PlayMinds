import Image from "next/image";
import img1 from "../../image/logo playminds.png";
import { useState } from "react";
import { User } from "@/models/Entitys/User";
import axios from "axios";
import { Request } from "../../helpers/requests";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSigIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = new User(email, "", password, "TEACHER", 0);
    try {
      axios
        .post(Request.SERVER + "/Users/Login", user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          response.data.password = "";
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#112B3C] grid grid-cols-1 lg:grid-cols-2">
        {/*Imagen*/}
        <div className="flex flex-col items-center justify-center sm:pl-[20%] mx-auto pad ">
          <Image src={img1} alt="Imagen de fondo" width={900} height={900} />
        </div>
        <div className="text-white flex flex-col items-center justify-center gap-8 p-8 max-w-lg mx-auto">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-4xl font-medium">Iniciar sesión</h1>
            <p className="text-gray-400">
              Ingresa al sistema con tus credenciales
            </p>
          </div>
          {/*Formulario*/}
          <form className="flex flex-col gap-4" onSubmit={handleSigIn}>
            <div>
              <label htmlFor="email" className="text-gray-200">
                Correo electrónico
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                id="email"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-200">
                Contraseña
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                id="password"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 order-2 md:order-1">
              <span className="text-gray-400">
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  className="text-indigo-400 hover:text-indigo-500 transition-colors"
                >
                  Registrate
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
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
