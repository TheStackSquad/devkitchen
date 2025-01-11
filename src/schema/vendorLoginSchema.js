// src/schema/vendorLoginSchema.js
const Yup = require('yup');

// Example schema for vendor login
const vendorLoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

module.exports = vendorLoginSchema;
