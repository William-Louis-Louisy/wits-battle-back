import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import userModels from "../models/user.models";
import { registerSchema } from "../middlewares/dataValidation";

interface JwtPayload extends jwt.JwtPayload {
  id: string;
  isAdmin: boolean;
}

// CREATE TOKEN
const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: maxAge,
  });
};

// ERROR HANDLING
const handleErrors = (err: any) => {
  let errors: { [key: string]: string } = {
    username: "",
    email: "",
    password: "",
  };

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// USER CONTROLLER
export const userController = {
  // Create user
  createUser: async function (req: Request, res: Response) {
    // Get data from request body
    const { username, email, password } = req.body;

    // Validate user data
    const { error } = registerSchema.validate({ username, email, password });
    if (error) {
      // reduce the error.details array into a single object
      let errors = error.details.reduce((acc: { [key: string]: any }, curr) => {
        // for each error detail, add a new property to the accumulator object
        // use the 'path' value (joined by ".") as the property key,
        // and the 'message' as its value
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});

      return res.status(400).json({ errors });
    }

    try {
      // Check if the user exists already
      const userExists = await userModels.findOne({
        $or: [{ email }, { username }],
      });
      if (userExists) {
        return res
          .status(400)
          .json({ errors: "Email or username already in use" });
      }

      const user = await userModels.create({ username, email, password });
      const token = createToken(user._id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  },

  // Retrieve all users
  getAllUsers: async function (req: Request, res: Response) {
    try {
      const users = await userModels.find().select("-password");
      res.status(200).json({
        status: 200,
        data: users,
        message: "Successfully retrieved all users",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Retrieve user by id
  getUserById: async function (req: Request, res: Response) {
    try {
      const user = await userModels.findById(req.params.id).select("-password");
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully retrieved user by id",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Retrieve user by username
  getUserByUsername: async function (req: Request, res: Response) {
    try {
      const user = await userModels
        .findOne({ username: req.params.username })
        .select("-password");
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully retrieved user by username",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Retrieve user by email
  getUserByEmail: async function (req: Request, res: Response) {
    try {
      const user = await userModels
        .findOne({ email: req.params.email })
        .select("-password");
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully retrieved user by email",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Update user by id
  updateUserById: async function (req: Request, res: Response) {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      if (req.params.id !== decodedToken.id && !decodedToken.isAdmin) {
        throw new Error("Unauthorized");
      }

      const user = await userModels
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
        .select("-password");
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully updated user by id",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Delete user by id
  deleteUserById: async function (req: Request, res: Response) {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      if (req.params.id !== decodedToken.id && !decodedToken.isAdmin) {
        throw new Error("Unauthorized");
      }

      const user = await userModels.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 200,
        data: user,
        message: "Successfully deleted user by id",
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Login user
  login: async function (req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userModels.login(email, password);
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        secure: process.env.NODE_ENV === "production",
        domain: ".localhost",
      });

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePicture: user.profilePicture,
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  },

  // Logout user
  logout: function (req: Request, res: Response) {
    return res
      .clearCookie("jwt", { domain: ".localhost" })
      .status(200)
      .json({ status: 200, message: "Logout successful" });
  },
};
