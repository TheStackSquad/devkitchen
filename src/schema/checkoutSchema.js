// src/schema/checkoutSchema.js
import * as yup from 'yup';

const cardNumberRegex = /^[0-9]{16}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const cvvRegex = /^[0-9]{3}$/;
const zipCodeRegex = /^[0-9]{5}$/;

export const checkoutSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(cardNumberRegex, 'Please enter a valid 16-digit card number')
    .required('Card number is required'),
    
  expiryDate: yup
    .string()
    .matches(expiryDateRegex, 'Please enter a valid expiry date (MM/YY)')
    .test('expiry', 'Card has expired', (value) => {
      if (!value) return false;
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    })
    .required('Expiry date is required'),
    
  securityCode: yup
    .string()
    .matches(cvvRegex, 'Please enter a valid 3-digit security code')
    .required('Security code is required'),
    
  zipCode: yup
    .string()
    .matches(zipCodeRegex, 'Please enter a valid 5-digit zip code')
    .required('Zip code is required'),
});