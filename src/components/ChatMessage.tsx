interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
  return (
    <div
      className={`flex mb-3 ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-white ${
          isSystemMessage
            ? "bg-gray-800 text-center text-xs"
            : isOwnMessage
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
      >
        {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
