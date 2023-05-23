import mongoose, { Schema } from "mongoose";
import { IScoreboard } from "../interfaces/schema.interfaces";

// SCHEMA
const ScoreboardSchema = new Schema<IScoreboard>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IScoreboard>("Scoreboard", ScoreboardSchema);
