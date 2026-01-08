import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;


const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  
  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log("🚀 Socket server initialized");

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`👤 User joined room: ${userId}`);
    });

    // Send notification
    socket.on("send-notification", ({ userId, notification }) => {
      io.to(userId).emit("new-notification", notification);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🔥 Server ready on http://${hostname}:${port}`);
    });
});
