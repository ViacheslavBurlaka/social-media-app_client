import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      return {
        ...state,
        screams: [
          ...state.screams.slice(0, index),
          (state.screams[index] = action.payload),
          ...state.screams.slice(index + 1)
        ]
      };
    }
    case DELETE_SCREAM: {
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload);
      return {
        ...state,
        screams: [...state.screams.slice(0, index), ...state.screams.slice(index + 1)]
      };
    }
    default:
      return state;
  }
};
