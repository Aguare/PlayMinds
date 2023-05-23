import NavBar from '../components/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'

const UserCard = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full pl-5">
          <div className="bg-white hover:bg-cyan-600 group rounded-lg shadow hover:shadow-lg hover:shadow-mainorange transition-all hover:cursor-pointer">
            <div className="flex justify-center py-8">
              <div className="bg-[gray] text-white rounded-full w-20 h-20 flex items-center justify-center font-semibold text-xl group-hover:text-white transition-all">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[bluemain] text-5xl"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <h3 className="font-semibold text-xl group-hover:text-white transition-all">
                NAME
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300">TIPO</p>
              <button className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg">
                <FontAwesomeIcon icon={faTrash} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
