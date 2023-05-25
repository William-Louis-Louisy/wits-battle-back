import { userController } from "../controllers/user.controllers";

const express = require("express");
const userRouter = express.Router();

// CREATE USER
userRouter.post("/register", userController.createUser);

// RETRIEVE ALL USERS
userRouter.get("/users", userController.getAllUsers);

// RETRIEVE AN USER BY ID
userRouter.get("/users/:id", userController.getUserById);

// UPDATE A USER BY ID
userRouter.put("/users/:id", userController.updateUserById);

// DELETE A USER BY ID
userRouter.delete("/users/:id", userController.deleteUserById);

// LOGIN USER
userRouter.post("/login", userController.login);

// LOGOUT USER
userRouter.get("/logout", userController.logout);

export default userRouter;
