import mongoose, { model, Schema } from "mongoose";

const sessionSchema = new Schema({
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  expires: { type: Date, required: true },
});

const SessionModel =
  mongoose.models.sessions || model("sessions", sessionSchema);

export default SessionModel;
