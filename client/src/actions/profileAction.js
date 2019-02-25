import {
  CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING
} from "../actions/types";
import axios from "axios";
import { url } from "../config/config";

export const getUserProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${url}/api/v1/profile`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// on logout clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};