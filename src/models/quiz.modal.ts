import mongoose, { Document, Schema } from "mongoose";

type OptionKey = "A" | "B" | "C" | "D";

interface IQuestions extends Document {
  question: string;
  options: Record<OptionKey, string>;
  answer: [OptionKey, string];
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
    type: [String],
    validate: {
      validator: (arr: string[]) =>
        Array.isArray(arr) &&
        arr.length === 2 &&
        ["A", "B", "C", "D"].includes(arr[0]) &&
        typeof arr[1] === "string",
      message: "Answer must be [OptionKey, string]",
    },
    required: true,
  },
});

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    questions: [questionSchema],
    topic: { type: String, required: true },
    difficulty: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
