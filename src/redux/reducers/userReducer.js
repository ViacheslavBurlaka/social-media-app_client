import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
  authenticated: false,
  credentials: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
};
