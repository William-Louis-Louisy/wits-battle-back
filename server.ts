import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { setupRoutes } from "./routes";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
require("dotenv").config();

// DATABASE CONNECTION
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    autoIndex: true,
  })
  .then(() => console.log("🟢 Connected to database"))
  .catch((err: any) => console.log(err));

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: ["*", "localhost:3000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
setupRoutes(app);

// SOCKET.IO SETUP
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected :D");
  socket.on("disconnect", () => {
    console.log("user disconnected D:");
  });
});

// START SERVER
httpServer.listen(process.env.PORT, () => {
  console.log(`🟢 Listening on port ${process.env.PORT}`);
});
