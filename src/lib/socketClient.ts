"use client"; // This tells Next.js that this code should run on the client side

// Import the Socket.IO client library
import { io } from "socket.io-client";

// Create a Socket.IO connection to the server
// The localhost:3000 address must match the Socket.IO server address
// Additional settings to improve connection stability
export const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"], // Use WebSocket and fallback to polling if not supported
  autoConnect: true, // Connect to the server automatically
  reconnection: true, // Try to reconnect if disconnected
});
