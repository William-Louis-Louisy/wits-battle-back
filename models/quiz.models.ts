import mongoose, { Schema } from "mongoose";
import { IQuiz } from "../interfaces/schema.interfaces";

// SCHEMA
const QuizSchema = new Schema<IQuiz>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  gameMode: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Quiz", QuizSchema);
