import mongoose, { Schema } from "mongoose";
import { IQuestionType } from "../interfaces/schema.interfaces";

// SCHEMA
const QuestionTypeSchema = new Schema<IQuestionType>({
  questionType: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("QuestionType", QuestionTypeSchema);
