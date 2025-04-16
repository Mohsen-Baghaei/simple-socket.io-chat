// Define component props
interface ChatMessageProps {
  sender: string; // Name of the message sender
  message: string; // Message content
  isOwnMessage: boolean; // Is this message from the current user?
}

// ChatMessage component to display messages
const ChatMessage = ({ sender, message, isOwnMessage }: ChatMessageProps) => {
  // Check if this is a system message (like user joined/left notifications)
  const isSystemMessage = sender === "system";

  return (
    <div
      className={`flex mb-3 ${
        isSystemMessage
          ? "justify-center" // System messages in center
          : isOwnMessage
          ? "justify-end" // User's own messages on right
          : "justify-start" // Other users' messages on left
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-white ${
          isSystemMessage
            ? "bg-gray-800 text-center text-xs" // System message style
            : isOwnMessage
            ? "bg-blue-500" // Own message style
            : "bg-green-500" // Other users' message style
        }`}
      >
        {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}{" "}
        {/* Show sender name (except for system messages) */}
        <p>{message}</p> {/* Display message content */}
      </div>
    </div>
  );
};

export default ChatMessage;
