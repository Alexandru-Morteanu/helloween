import mongoose, { Schema } from "mongoose";

const LogInSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
// users => collection name!
// MongoDB will make a new collection automatically named users!
const LogIn = mongoose.models.LogIn || mongoose.model("users", LogInSchema);

export default LogIn;
