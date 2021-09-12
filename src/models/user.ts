import mongoose, { Schema, model } from "mongoose";

export interface User extends mongoose.Document {
  chatId: string
  isActive: boolean
  name: string
}

const UserSchema = new Schema({
  chatId: String,
  isActive: Boolean,
  name: String
});

export default model<User>("User", UserSchema);