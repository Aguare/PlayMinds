import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Notification } from "../models/Entitys/Notification";
import axios from "axios";
import { Request } from "@/helpers/requests";
import { User } from "@/models/Entitys/User";

const BtnNotify = () => {
  const [showNotifications, setShowNotifications] = useState<Boolean>(false);
  const [notifications, setNotification] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (user?.email !== null) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);

  if (user?.email != undefined && amount === 0) {
    axios
      .get(Request.GET_NOTIFICATIONS + "?email=" + user?.email, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNotification(response.data);
        setAmount(response.data.length);
      });
  }

  return (
    <div className="relative">
      <button
        className="relative z-10"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FontAwesomeIcon icon={faBell} className="text-[#EFEFEF] text-xl" />
        {amount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white px-1 py-0.5 text-xs rounded-full">
            {amount}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute top-[calc(100%+3px)] right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-20">
          {amount > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="mb-2 border border-gray-300 p-1"
              >
                <a href={"../" + notification.redirect}>
                  {notification.message}
                </a>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BtnNotify;
