// src/utils/validation.js
import { validateField } from '@/schema/userSchema';

// Debounce function for input validation
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate single field with debounce
export const debouncedValidateField = debounce(async (fieldName, value, setFieldError) => {
  console.log(`Debounced validation for ${fieldName}`); // Debug log
  const result = await validateField(fieldName, value);
  if (!result.isValid) {
    setFieldError(fieldName, result.error);
  }
}, 300);

// Format phone number
export const formatPhoneNumber = (value) => {
  console.log('Formatting phone number:', value); // Debug log
  const numbers = value.replace(/\D/g, '');
  return numbers.slice(0, 10);
};

// Check password strength
export const checkPasswordStrength = (password) => {
  console.log('Checking password strength'); // Debug log
  const strengthChecks = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
  
  const passedChecks = Object.values(strengthChecks).filter(Boolean).length;
  
  return {
    score: Math.min(Math.floor((passedChecks / 5) * 100), 100),
    checks: strengthChecks,
  };
};

// Generate username suggestions
export const generateUsernameSuggestions = (username) => {
  console.log('Generating username suggestions for:', username); // Debug log
  const suggestions = [
    `${username}${Math.floor(Math.random() * 100)}`,
    `${username}_${Math.floor(Math.random() * 100)}`,
    `${username}${new Date().getFullYear()}`,
  ];
  return suggestions;
};
