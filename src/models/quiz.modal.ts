import mongoose, { Document, Schema } from "mongoose";

type OptionKey = "A" | "B" | "C" | "D";

interface IQuestions extends Document {
  question: string;
  options: Record<OptionKey, string>;
  answer: {
    option: OptionKey;
    text: string;
  };
}

const questionSchema = new Schema<IQuestions>({
  question: { type: String, required: true },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
  },
  answer: {
    option: { type: String, enum: ["A", "B", "C", "D"], required: true },
    text: { type: String, required: true },
  },
});

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    questions: [questionSchema],
    topic: { type: String, required: true },
    difficulty: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

quizSchema.index({ userId: 1, createdAt: -1 });



export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
