import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:8000");

interface MessageEntity {
  userId: string;
  username: string;
  text: string;
}

export const Chat: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputRoomnameRef = useRef<HTMLInputElement>(null);
  const inputChatRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
      setLogin(false);
    });

    socket.on("message", (res: MessageEntity) => {
      setMessages((prev) => [...prev, res]);
    });
  }, []);

  const handleJoinRoom = () => {
    if (
      inputUsernameRef.current!.value !== "" &&
      inputRoomnameRef.current!.value !== ""
    ) {
      socket.emit("joinRoom", {
        username: inputUsernameRef.current!.value,
        roomname: inputRoomnameRef.current!.value,
      });

      setLogin(true);
      inputUsernameRef.current!.value = "";
      inputRoomnameRef.current!.value = "";
    }
  };

  const handleSendChat = () => {
    if (inputChatRef.current!.value !== "") {
      socket.emit("chat", inputChatRef.current!.value);

      inputChatRef.current!.value = "";
    }
  };

  if (login === true)
    return (
      <>
        <div className="max-w-4xl w-full min-h-[50vh] mx-auto bg-gray-200 rounded-md p-2">
          {messages.map((message, key) => (
            <div key={key}>
              <div>{message.username}</div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <input
          ref={inputChatRef}
          type="text"
          placeholder="send message"
          className="block px-4 py-2 rounded-md shadow-md my-1 focus:outline-none"
        />
        <button
          onClick={() => handleSendChat()}
          className="w-full px-4 py-2 rounded-md bg-gray-300 mb-5"
        >
          send
        </button>
      </>
    );
  else
    return (
      <>
        <input
          ref={inputUsernameRef}
          type="text"
          placeholder="username"
          className="block px-4 py-2 rounded-md shadow-md my-1 focus:outline-none"
        />
        <input
          ref={inputRoomnameRef}
          type="text"
          placeholder="roomname"
          className="block px-4 py-2 rounded-md shadow-md my-1 focus:outline-none"
        />
        <button
          onClick={() => handleJoinRoom()}
          className="w-full px-4 py-2 rounded-md bg-gray-300 mb-5"
        >
          join
        </button>
      </>
    );
};
