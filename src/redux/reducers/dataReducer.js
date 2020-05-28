import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA } from '../types';

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
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      // eslint-disable-next-line no-case-declarations
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      state.screams[index] = action.payload;
      console.log(state.screams);
      return {
        ...state
      };
    default:
      return state;
  }
};