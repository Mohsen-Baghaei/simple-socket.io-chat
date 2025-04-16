/**
 * Socket.IO Chat Server for Next.js Chat Application
 * This file sets up a server that handles the WebSocket connections
 * for real-time chat functionality.
 */

// Import the HTTP server from Node.js
import { createServer } from "node:http";
// Import Next.js to handle web page serving
import next from "next";
// Import Socket.IO Server class
import { Server } from "socket.io";

// Determine if we're running in development or production mode
const dev = process.env.NODE_ENV !== "production";

// Set the hostname and port for the server
// Use environment variables if available, otherwise use defaults
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js application
// This handles the rendering of our React components
const app = next({ dev, hostname, port });

// Get the request handler from Next.js
// This is responsible for serving pages and assets
const handle = app.getRequestHandler();

// Prepare the Next.js app and start the server when ready
app.prepare().then(() => {
  // Create an HTTP server using the Next.js request handler
  const httpServer = createServer(handle);

  // Initialize Socket.IO on top of our HTTP server
  // This enables real-time bidirectional communication
  const io = new Server(httpServer, {
    // Configure CORS (Cross-Origin Resource Sharing) settings
    cors: {
      origin: "*", // Allow connections from any origin (not recommended for production)
      methods: ["GET", "POST"], // Allow these HTTP methods
    },
  });

  // Data structure to track users in each chat room
  // Using a Map for efficient lookup and modification
  // Structure: Map<roomName, Map<socketId, username>>
  const usersInRooms = new Map<string, Map<string, string>>();

  // Handle new socket connections
  io.on("connection", (socket) => {
    // Log when a user connects to the server
    console.log(`User connected: ${socket.id}`);

    // Variables to track this socket's current room and username
    // These need to be stored for cleanup on disconnect
    let currentRoom = "";
    let currentUsername = "";

    // Handle the 'join-room' event when a user wants to join a chat room
    socket.on("join-room", ({ room, username }) => {
      // Store the user's room and username for later reference
      currentRoom = room;
      currentUsername = username;

      // Add this socket to the specified room
      // Socket.IO's built-in room functionality
      socket.join(room);
      console.log(`User ${username} joined room ${room}`);

      // Update our user tracking data structure
      // Create the room Map if it doesn't exist
      if (!usersInRooms.has(room)) {
        usersInRooms.set(room, new Map());
      }
      // Add the user to the room
      usersInRooms.get(room)?.set(socket.id, username);

      // Notify other users in the room that someone joined
      // This emits only to sockets in the room, excluding the sender
      socket.to(room).emit("user-joined", `${username} joined ${room}`);

      // Send a confirmation message back to the user who joined
      // This emits only to the sender socket
      socket.emit("join-room", `You joined ${room}`);
    });

    // Handle the 'message' event when a user sends a chat message
    socket.on("message", ({ room, message, sender }) => {
      // Log the message for debugging purposes
      console.log(`Message from ${sender} in room ${room}: ${message}`);

      // Forward the message to all other users in the room
      // This emits to all sockets in the room except the sender
      socket.to(room).emit("message", { sender, message });
    });

    // Handle socket disconnection (user closes tab, loses connection, etc.)
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // If this user was in a room, clean up and notify others
      if (currentRoom && currentUsername) {
        // Get the Map of users in this room
        const roomUsers = usersInRooms.get(currentRoom);
        if (roomUsers) {
          // Remove this user from the room
          roomUsers.delete(socket.id);

          // Notify remaining users that someone left
          socket
            .to(currentRoom)
            .emit("user-joined", `${currentUsername} left the room`);

          // If the room is now empty, remove it from our tracking
          if (roomUsers.size === 0) {
            usersInRooms.delete(currentRoom);
          }
        }
      }
    });
  });

  // Start the HTTP server on the specified port
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
