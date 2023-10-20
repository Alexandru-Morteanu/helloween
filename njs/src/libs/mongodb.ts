import mongoose from "mongoose";

const connectToMongoDB = () => {
  try {
    //url structure: mongodb+srv://username:<password>@cluster0.ndxszfq.mongodb.net/databaseNameHERE!?retryWrites=true&w=majority
    mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to the db!");
  } catch (error) {
    console.log(error);
  }
};
export default connectToMongoDB;
