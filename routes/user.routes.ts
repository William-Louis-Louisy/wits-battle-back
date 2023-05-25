import { userController } from "../controllers/user.controllers";

const express = require("express");
const userRouter = express.Router();

// CREATE USER
userRouter.post("/register", userController.createUser);

// RETRIEVE ALL USERS
userRouter.get("/users", userController.getAllUsers);

// RETRIEVE AN USER BY ID

// UPDATE A USER BY ID

// DELETE A USER BY ID

// LOGIN USER
userRouter.post("/login", userController.login);

export default userRouter;
