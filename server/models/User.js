import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: String,       // Clerk user ID
  email: String,
  name: String,
  image: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');
