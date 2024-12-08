import express, { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";

// Initialize Express app and HTTP server
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust this for specific domains
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "client")));
// Serve a simple message at the root
app.get("/", (req: Request, res: Response) => {
  // res.send('/client');
  // res.sendFile(path.join(__dirname + "client/index.html"));
});

// Handle client connections
io.on("connection", (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send random number every 5 seconds
  const interval = setInterval(() => {
    const eurValue = Math.floor(Math.random() * 100);
    const usdValue = Math.floor(Math.random() * 100);
    socket.emit("randomNumber", [eurValue, usdValue]);
  }, 5000);

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(interval); // Clean up interval
  });
});

// Start the server
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
