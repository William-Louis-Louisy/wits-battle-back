import mongoose, { Schema, Types, Document } from "mongoose";

interface IQuiz extends Document {
  name: string;
  creator: Types.ObjectId;
  questions: Types.ObjectId[];
  players: Types.ObjectId[];
  gameMode: string;
}

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
