import { Types, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  score: number;
  friends: Types.ObjectId[];
  isAdmin: boolean;
}

export interface IScoreboard extends Document {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  score: number;
  timestamp: Date;
}

export interface IQuiz extends Document {
  name: string;
  creator: Types.ObjectId;
  questions: Types.ObjectId[];
  players: Types.ObjectId[];
  gameMode: string;
}

export interface IQuestionType {
  questionType: string;
}

export interface IQuestion extends Document {
  questionType: Types.ObjectId;
  category: string;
  text: string;
  choices: string[];
  answer: string;
  points: number;
  penalty: number;
  timer: number;
}
