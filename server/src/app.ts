import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./services/logger.ts";
import authRoutes from "./routes/auth.routes.ts";
import apiRoutes from "./routes/api.routes.ts";
import { Strategy } from "passport-google-oauth2";
import passport from "passport";
import { verifyCallback } from "./controllers/auth.controller.ts";
import type { User } from "./db/schema/user.schema.ts";
import env from "../env.ts";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

const AUTH_OPTIONS = {
  callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
};

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: Pick<User, "id">, done) => {
  done(null, id);
});

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();

app.use(helmet());

// app.use(
//   cookieSession({
//     name: "session",
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [COOKIE_KEY_1, COOKIE_KEY_2],
//   }),
// );

app.use(passport.initialize());
// app.use(passport.session());

app.use(
  cors({
    origin: "https://localhost:3001",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Paymaster Control",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", apiRoutes);

export { app };
export default app;
