import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS
} from '../types';
import axios from 'axios';

export const getAllScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeScream = (screamID) => (dispatch) => {
  axios
    .get(`/scream/${screamID}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.error(err));
};

export const unlikeScream = (screamID) => (dispatch) => {
  axios
    .get(`/scream/${screamID}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.error(err));
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/screams/${screamId}`)
    .then((res) => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch((err) => console.error(err));
};
