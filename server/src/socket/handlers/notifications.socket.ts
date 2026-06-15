import { getIO, getConnectedUsers } from "../socket.ts";
import logger from "../../services/logger.ts";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  userId?: string;
  metadata?: Record<string, any>;
}

export function sendNotification(
  userId,
  notification: Omit<Notification, "id" | "timestamp" | "read">,
): boolean {
  try {
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const socketId = connectedUsers.get(userId);

    const fullNotification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
      userId,
    };

    if (socketId) {
      io.to(socketId).emit("notification", fullNotification);
      logger.info(`Notification sent to user ${userId}`);
      return true;
    } else {
      io.to(`user:${userId}`).emit("notification", fullNotification);
      logger.warn(`User ${userId} not found in connected users, sent to room`);
      return false;
    }
  } catch (error) {
    logger.error(`Error sending notification: ${error}`);
    return false;
  }
}
