//src/reduxStore/actions/authActions.js


import {
  LOGIN,
  LOGOUT,
 // SET_LOADING,
 UPDATE_PROFILE_IMAGE,
} from '@/reduxStore/constants/actionTypes.js';


// Login action for users
export const loginUser = (userData) => ({
  type: LOGIN,
  payload: userData, // Send the entire userData object
});

// Logout action for users 
export const logoutUser = () => ({
  type: LOGOUT,
});

// Update profile image
export const updateProfileImage = (profilePic) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: { profilePic } // Ensure the payload contains profilePic
});