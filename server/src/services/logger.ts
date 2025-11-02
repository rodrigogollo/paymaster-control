import winston from "winston";
const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json({ space: 2 })),
  transports: [new winston.transports.Console()],
  // exceptionHandlers: [
  //   new winston.transports.File({ filename: "exception.log" }),
  // ],
  // rejectionHandlers: [
  //   new winston.transports.File({ filename: "rejections.log" }),
  // ],
});

export default logger;
