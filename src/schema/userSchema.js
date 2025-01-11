// src/schema/userSchema.js
import * as Yup from 'yup';

// Console log for debugging schema initialization
console.log('Initializing validation schema');

export const userSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .required('Username is required'),
    
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    
  phone: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      'Phone number must be exactly 10 digits'
    )
    .required('Phone number is required'),
    
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
    
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
    
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

// Debug function to test validation
export const validateField = async (fieldName, value) => {
  console.log(`Validating field: ${fieldName} with value:`, value);
  try {
    await userSchema.validateAt(fieldName, { [fieldName]: value });
    console.log(`Validation passed for ${fieldName}`);
    return { isValid: true };
  } catch (error) {
    console.log(`Validation failed for ${fieldName}:`, error.message);
    return { isValid: false, error: error.message };
  }
};