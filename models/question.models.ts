import mongoose, { Schema, Types, Document } from "mongoose";

// INTERFACE
interface IQuestion extends Document {
  questionType: Types.ObjectId;
  category: string;
  text: string;
  choices: string[];
  answer: string;
  points: number;
  penalty: number;
  timer: number;
}

// SCHEMA
const QuestionSchema = new Schema<IQuestion>({
  questionType: {
    type: Schema.Types.ObjectId,
    ref: "QuestionType",
    required: true,
  },
  category: { type: String, required: true },
  text: { type: String, required: true },
  choices: [String],
  answer: { type: String, required: true },
  points: { type: Number, default: 1 },
  penalty: { type: Number, default: 0 },
  timer: Number,
});

export default mongoose.model("Question", QuestionSchema);
