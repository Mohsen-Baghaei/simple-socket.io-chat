// Import React hooks
import { ChangeEvent, Dispatch, SetStateAction, FormEvent } from "react";

// Define component props
interface LoginProps {
  userName: string; // Username
  setUserName: Dispatch<SetStateAction<string>>; // Function to change username
  room: string; // Room name
  setRoom: Dispatch<SetStateAction<string>>; // Function to change room name
  handleJoinRoom: () => void; // Function to join a room
}

// Login component
const Login = ({
  userName,
  setUserName,
  room,
  setRoom,
  handleJoinRoom,
}: LoginProps) => {
  // Form submission handler
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser behavior
    handleJoinRoom(); // Call the function to join the room
  };

  // Render login form
  return (
    <form
      className="flex w-full max-w-3xl mx-auto flex-col items-center space-y-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-bold">join a Room</h1>
      {/* Username input */}
      <input
        type="text"
        name="userName"
        id="userName"
        placeholder="Enter your userName"
        value={userName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
        className="w-64 px-4 py-2 border-2 rounded-lg"
      />
      {/* Room name input */}
      <input
        type="text"
        name="room"
        id="room"
        placeholder="Enter your roomName"
        value={room}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
        className="w-64 px-4 py-2 border-2 rounded-lg"
      />
      {/* Join room button */}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        Join Room
      </button>
    </form>
  );
};

export default Login;
