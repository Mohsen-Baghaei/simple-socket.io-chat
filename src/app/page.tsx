"use client";

import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import Login from "@/components/Login";
import { useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");

  const onSendMessage = (message: string) => {
    console.log(message);
  };

  const handleJoinRoom = () => {
    setJoined(true);
  };

  return (
    <div className="flex mt-24 justify-center w-full">
      {joined ? (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: </h1>
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-200 border-2 rounded-lg">
            {messages.map((msg, i) => {
              return (
                <ChatMessage
                  key={i}
                  sender={msg.sender}
                  message={msg.message}
                  isOwnMessage={msg.sender === userName}
                />
              );
            })}
          </div>
          <ChatForm onSendMessage={onSendMessage} />
        </div>
      ) : (
        <Login
          userName={userName}
          setUserName={setUserName}
          room={room}
          setRoom={setRoom}
          handleJoinRoom={handleJoinRoom}
        />
      )}
    </div>
  );
}
