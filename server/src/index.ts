import http from "node:http";
import app from "./app.ts";
import env from "../env.ts";
import { initSocket } from "./socket/socket.ts";
import { sendNotification } from "./socket/handlers/notifications.socket.ts";

const { PORT } = env;

const server = http.createServer(app);

// initSocket(server);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Socket.IO ready on port ${PORT}`);
  });

  // setInterval(() => {
  //   console.log("⏰ Simulating backend event...");
  //   sendNotification("user-123", {
  //     title: "Scheduled Notification",
  //     message: "This is a test notification from the backend timer.",
  //     type: "info",
  //   });
  // }, 30000);
}

startServer();
