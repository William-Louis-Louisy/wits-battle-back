import { Application } from "express";
import userRouter from "./routes/user.routes";

export function setupRoutes(app: Application) {
  app.use(userRouter);
}
