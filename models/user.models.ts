import mongoose, { Schema, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

// INTERFACE
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  score: number;
  friends: Types.ObjectId[];
  isAdmin: boolean;
}

// SCHEMA
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    default: 0,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// MIDDLEWARE (HASH PASSWORD)
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// STATIC METHODS
interface IUserModel extends mongoose.Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

UserSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect password");
  }
  throw new Error("Incorrect email");
};

export default mongoose.model<IUser, IUserModel>("User", UserSchema);
