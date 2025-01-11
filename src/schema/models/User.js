//src/schema/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  city: {
    type: String,
    required: [true, 'Please provide a city'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  profilePic: {
    type: String,
    default: 'drgnimages.jpeg',
    trim: true
  },
  recent: [
    {
      image: { type: String, required: true },
      category: { type: String, required: true },
      mealName: { type: String, required: true },
      price: { type: Number, required: true },
    //  _id: { type: Schema.Types.ObjectId, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);