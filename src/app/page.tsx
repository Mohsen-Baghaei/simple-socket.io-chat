"use client"; // This tells Next.js that this code should run on the client side

// Import required components
import ChatForm from "@/components/ChatForm"; // Chat form component
import ChatMessage from "@/components/ChatMessage"; // Message display component
import Login from "@/components/Login"; // Login component
import { socket } from "@/lib/socketClient"; // Socket.IO connection
import { useEffect, useState } from "react"; // React hooks

export default function Home() {
  // Define required state
  const [room, setRoom] = useState(""); // Room name
  const [joined, setJoined] = useState(false); // Room join status
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]); // List of messages
  const [userName, setUserName] = useState(""); // Username

  // Connect to Socket.IO events
  useEffect(() => {
    // Function to receive messages from other users
    const onMessage = (data: { sender: string; message: string }) => {
      setMessages((prev) => [...prev, data]); // Add new message to messages list
    };

    // Function to receive user join notifications
    const onUserJoined = (message: string) => {
      setMessages((prev) => [...prev, { sender: "system", message }]); // Add system message
    };

    // Function to receive room join confirmation
    const onJoinRoom = (message: string) => {
      setMessages((prev) => [...prev, { sender: "system", message }]); // Add system message
    };

    // Listen for events
    socket.on("message", onMessage); // New messages
    socket.on("user-joined", onUserJoined); // User join notifications
    socket.on("join-room", onJoinRoom); // Room join confirmation

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("message", onMessage);
      socket.off("user-joined", onUserJoined);
      socket.off("join-room", onJoinRoom);
    };
  }, []); // Run once on component mount

  // Function to send a message
  const onSendMessage = (message: string) => {
    const data = { room, message, sender: userName }; // Create message data
    setMessages((prev) => [...prev, { sender: userName, message }]); // Add message to local list
    socket.emit("message", data); // Send message to server
  };

  // Function to join a room
  const handleJoinRoom = () => {
    if (room && userName) {
      // Check if fields are filled
      socket.emit("join-room", { room, username: userName }); // Send join room request
      setJoined(true); // Change status to joined
    }
  };

  // Render component
  return (
    <div className="flex mt-24 justify-center w-full">
      {joined ? ( // Conditional rendering: If joined, show chat
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room: {room}</h1>
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-200 border-2 rounded-lg">
            {messages.map((msg, i) => {
              return (
                <ChatMessage
                  key={i}
                  sender={msg.sender}
                  message={msg.message}
                  isOwnMessage={msg.sender === userName} // Identify user's own messages
                />
              );
            })}
          </div>
          <ChatForm onSendMessage={onSendMessage} /> {/* Message form */}
        </div>
      ) : (
        // If not joined, show login form
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
