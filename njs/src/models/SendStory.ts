import mongoose, { Schema } from "mongoose";

const StorySchema = new Schema({
  author: { type: String, required: true },
  story: { type: String, required: true },
});
// story => collection name!
// MongoDB will make a new collection automatically named stories!
const Story = mongoose.models.LogIn || mongoose.model("story", StorySchema);

export default Story;
