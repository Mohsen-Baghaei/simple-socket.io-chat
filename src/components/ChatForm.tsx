"use client";

import { ChangeEvent, useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        placeholder="Type your message here..."
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500">
        Send
      </button>
    </form>
  );
};

export default ChatForm;
