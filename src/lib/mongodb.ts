import mongoose from "mongoose";

const connectionToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGO url not found");
    }
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectionToDatabase;
