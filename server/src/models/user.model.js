import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password must be at least 5 characters long']
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  }
}, {
  timestamps: true
});


export const userModel = model('User', userSchema);
