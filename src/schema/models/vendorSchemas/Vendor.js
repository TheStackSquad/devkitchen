const mongoose = require('mongoose');

// Define the schema
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  }
}, { 
  timestamps: true,
  // Add this to ensure proper collection name
  collection: 'vendors'
});

// Add compound index for better query performance
vendorSchema.index({ email: 1, username: 1 });

// Add this check to prevent model recompilation
const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;