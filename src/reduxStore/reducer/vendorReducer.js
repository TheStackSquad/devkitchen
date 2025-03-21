//src/reduxStore/reducers/vendorReducer.js
import {
    VENDOR_LOGIN,
    VENDOR_LOGIN_SUCCESS,
    VENDOR_LOGIN_FAILURE,
    VENDOR_LOGOUT,
    CLEAR_ERROR,
    UPDATE_VENDOR_PROFILE,
    VENDOR_ADD_MENU_ITEM,
    VENDOR_UPDATE_MENU_ITEM,
    VENDOR_REMOVE_MENU_ITEM,
    VENDOR_UPDATE_SESSION_MEALS,
    SET_AUTH,
  } from "../constants/actionTypes";
  
  const initialState = {
    vendorData: null, // Entire vendor object, including tokens and sessionData
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
      case VENDOR_LOGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case VENDOR_LOGIN_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            vendorData: {
              ...action.payload,
              vendor: {
                ...action.payload.vendor,
                // Handle both combined and separated schema cases
                profile: action.payload.vendor.profile || null
              }
            },
            error: null,
          };
  
      case VENDOR_LOGOUT:
        return {
          ...state,
          vendorData: null,
          isAuthenticated: false,
          loading: false,
        };
  
      // vendorReducer.js
      case UPDATE_VENDOR_PROFILE:
    return {
      ...state,
      vendorData: {
        ...state.vendorData, // Ensure this is a plain object
        sessionData: {
          ...state.vendorData?.sessionData, // Safely access sessionData
          profile: action.payload, // Update the profile
        },
      },
      isAuthenticated: state.isAuthenticated, // Preserve existing state
    };
  
  
      case VENDOR_UPDATE_SESSION_MEALS:
        return {
          ...state,
          vendorData: {
            ...state.vendorData,
            sessionData: {
              ...state.vendorData.sessionData,
              meals: action.payload,
            },
          },
        };
  
      case VENDOR_ADD_MENU_ITEM:
        return {
          ...state,
          vendorData: {
            ...state.vendorData,
            sessionData: {
              ...state.vendorData.sessionData,
              meals: [...state.vendorData.sessionData.meals, action.payload],
            },
          },
        };
  
      case VENDOR_UPDATE_MENU_ITEM:
        return {
          ...state,
          vendorData: {
            ...state.vendorData,
            sessionData: {
              ...state.vendorData.sessionData,
              meals: state.vendorData.sessionData.meals.map((meal) =>
                meal._id === action.payload._id ? action.payload : meal
              ),
            },
          },
        };
  
      case VENDOR_REMOVE_MENU_ITEM:
        return {
          ...state,
          vendorData: {
            ...state.vendorData,
            sessionData: {
              ...state.vendorData.sessionData,
              meals: state.vendorData.sessionData.meals.filter(
                (item) => item._id !== action.payload
              ),
            },
          },
        };
  
      case VENDOR_LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          isAuthenticated: false, // Reset authentication status
          error: action.payload,
        };
  
      case SET_AUTH:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
        };
  
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export default vendorReducer;
  