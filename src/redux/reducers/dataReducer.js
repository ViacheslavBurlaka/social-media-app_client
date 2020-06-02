import cloneDeep from 'lodash.clonedeep';

import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
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
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = { ...state.scream, ...action.payload };
      }
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
    case SUBMIT_COMMENT: {
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      let updatedScreams = cloneDeep(state.screams);
      updatedScreams[index].commentCount += 1;
      return {
        ...state,
        screams: updatedScreams,
        scream: {
          ...state.scream,
          comments: [action.payload.comment, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1
        }
      };
    }
    default:
      return state;
  }
};
