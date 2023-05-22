import mongoose, { Schema } from "mongoose";

interface IQuestionType {
  questionType: string;
}

// SCHEMA
const QuestionTypeSchema = new Schema<IQuestionType>({
  questionType: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("QuestionType", QuestionTypeSchema);
