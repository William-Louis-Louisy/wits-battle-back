import mongoose, { Schema, Types, Document } from "mongoose";

// INTERFACE
interface IScoreboard extends Document {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  score: number;
  timestamp: Date;
}

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
