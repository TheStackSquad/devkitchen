// src/schemas/models/vendorSchemas/Profile.js
const mongoose = require('mongoose');

// Define vendor types as an enum to ensure data consistency
const VENDOR_TYPES = {
  RESTAURANT: 'restaurant',
  GROCERY: 'grocery',
  SPICE: 'spice',
  BEVERAGE: 'beverage',
  CAFÉ: 'café',
  BAKERY: 'bakery',
  FARMER_MARKET: 'farmer_market',
  DELI: 'deli',
  FOOD_TRUCK: 'food_truck',
  JUICE_BAR: 'juice_bar',
  TEA_HOUSE: 'tea_house',
  WINE_SHOP: 'wine_shop',
  BREWERY: 'brewery',
  CATERING: 'catering',
  SNACK_VENDOR: 'snack_vendor',
};


const vendorProfileSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  storeName: {
    type: String,
    required: [true, 'Please provide a store name'],
    unique: true,
  },
  storeDescription: {
    type: String,
  },
  vendorType: {
    type: String,
    required: [true, 'Please specify vendor type'],
    enum: {
      values: Object.values(VENDOR_TYPES),
      message: '{VALUE} is not a supported vendor type'
    }
  },
  address: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  profilePic: {
    type: String,
  }
}, { timestamps: true });

// Export both the model and the vendor types
module.exports = {
  VendorProfile: mongoose.model('VendorProfile', vendorProfileSchema),
  VENDOR_TYPES
};