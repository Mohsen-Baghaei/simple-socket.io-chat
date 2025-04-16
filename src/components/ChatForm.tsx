"use client"; // This tells Next.js that this code should run on the client side

// Import React hooks
import { ChangeEvent, useState } from "react";

// Define ChatForm component
const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void; // Function to send messages
}) => {
  // Local state for message text
  const [message, setMessage] = useState("");

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form behavior

    // If message is not empty, send it
    if (message.trim() !== "") {
      onSendMessage(message); // Send the message
      setMessage(""); // Clear the input field
    }
  };

  // Render message input form
  return (
    <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
      {/* Message input field */}
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        placeholder="Type your message here..."
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
        value={message} // Add value for controlled input
      />
      {/* Send button */}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
