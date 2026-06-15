import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import logger from "../services/logger.ts";

let io: SocketIOServer | null = null;

const connectedUsers = new Map<string, string>();

export function initSocket(server: HTTPServer) {
  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("register", (userId: string) => {
      connectedUsers.set(userId, socket.id);
      logger.info(`User ${userId} registered with socket ${socket.id}`);

      socket.join(`user:${userId}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          logger.info(`User ${userId} disconnected!`);
          break;
        }
      }
    });

    socket.on("error", (error) => {
      logger.error(`Socket error: ${error.message}`);
    });
  });

  logger.info("Socket.IO initialized");
  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.IO not initialized. Call initSocket first.");
  }
  return io;
}

export function getConnectedUsers() {
  return connectedUsers;
}

export { io };
