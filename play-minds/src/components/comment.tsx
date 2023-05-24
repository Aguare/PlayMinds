import React, { useState, useEffect } from "react";
import { BsReply } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import { Game } from "../models/Entitys/Game";
import { Comment } from "../models/Entitys/Comment";
import { Request } from "@/helpers/requests";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    fetchComments();
  }, []);
  const [commentStates, setCommentStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleButtonPress = (commentId: string) => {
    setCommentStates((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        Request.GET_COMMENTS_BY_GAME + "?id_game=" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  return (
    <div className="w-[100%] ">
      {comments &&
        comments.map((comment) => (
          <ul key={comment.id_comment}>
            <li>
              <div className="  mx-auto w-[100%] bg-gray-100 p-6 rounded-lg mb-6 drop-shadow-xl border-2">
                <div className=" flex flex-col md:flex-row md:items-center justify-between border-b border-dashed border-gray-500/20 pb-6 mb-6">
                  <div className="flex items-start gap-x-4">
                    <FontAwesomeIcon icon={faUser} className="text-mainblue" />
                    <div>
                      <span className="text-gray-900 font-medium">
                        {comment.user_email}
                      </span>
                      <p className="text-gray-500 text-sm"></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <button
                      className={`bg-white hover:bg-cyan-600 group rounded-lg shadow hover:shadow-lg hover:shadow-mainorange transition-all hover:cursor-pointer text-lg hover:bg-gray-200 p-2 rounded-lg transition-colors ${
                        isButtonPressed ? "text-red-500" : ""
                      }`}
                      onClick={() => setIsButtonPressed(!isButtonPressed)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-mainblue"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Comments;
