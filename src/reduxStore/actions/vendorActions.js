//src/reduxSore/actions/vendorActions.js
import {
    VENDOR_LOGIN,
    VENDOR_LOGIN_SUCCESS,
    VENDOR_LOGIN_FAILURE,
    VENDOR_LOGOUT,
    CLEAR_ERROR,
    UPDATE_VENDOR_PROFILE,
  } from '../constants/actionTypes';

  // Action to initiate the login process
export const loginVendorAction = (vendorData) => (dispatch) => {
    dispatch({ type: VENDOR_LOGIN });

    if (!vendorData || !vendorData.vendor) {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        payload: 'Invalid vendor data received'
      });
      return;
    }
    try {
      // Validate required fields for basic vendor data
      const requiredFields = ['vendor', 'accessToken', 'refreshToken'];
      const missingFields = requiredFields.filter(field => !vendorData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
  
      // Profile data might be null initially, and that's okay
      const payload = {
        ...vendorData,
        vendor: {
          ...vendorData.vendor,
          profile: vendorData.vendor.profile || null
        }
      };
  
      dispatch({
        type: VENDOR_LOGIN_SUCCESS,
        payload
      });
    } catch (error) {
      dispatch({
        type: VENDOR_LOGIN_FAILURE,
        payload: error.message || 'Login failed'
      });
    }
  };
  
  // Action to log out vendor
  export const logoutVendor = () => (dispatch) => {
    // Clear token and any persisted data
    localStorage.removeItem('userData');
  
    // Dispatch actions for logout and session failure
    dispatch({ type: VENDOR_LOGOUT });
  };
  
  // Action to clear error messages
  export const clearError = () => ({
    type: CLEAR_ERROR,
  });

  // vendorActions for profile updates
export const updateVendorProfile = (profile) => {
  return {
    type: UPDATE_VENDOR_PROFILE,
    payload: profile
  };
}