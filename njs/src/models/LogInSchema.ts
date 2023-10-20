import mongoose, { Schema } from "mongoose";

const LogInSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const LogIn = mongoose.models.LogIn || mongoose.model("users", LogInSchema);

export default LogIn;
