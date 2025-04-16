import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface LoginProps {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  handleJoinRoom: () => void;
}

const Login = ({
  userName,
  setUserName,
  room,
  setRoom,
  handleJoinRoom,
}: LoginProps) => {
  return (
    <form
      className="flex w-full max-w-3xl mx-auto flex-col items-center space-y-4"
      onSubmit={handleJoinRoom}
    >
      <h1 className="text-2xl font-bold">join a Room</h1>
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
      <input
        type="text"
        name="room"
        id="room"
        placeholder="Enter your roomName"
        value={room}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
        className="w-64 px-4 py-2 border-2 rounded-lg"
      />
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
