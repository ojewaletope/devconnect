import {GET_ERRORS, LOADING} from './types'
import {SET_CURRENT_USER}    from './types'
import { url }               from "../config/config";
import axios                 from "axios";
import setAuthToken          from '../utils/setAuthToken'
import jwt_decode            from 'jwt-decode'
// Register
export const registerUser = (userData, history) => dispatch =>{
  axios
    .post(`${url}/api/v1/users/register`, userData)
    .then(res => {
      if (res.status) {
        history.push('/login');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log(err);
    });
};

// login user
export const loginUser = (user) => dispatch => {
  dispatch(setLoading());
  axios
    .post(`${url}/api/v1/users/login`, user)
    .then(user => {
      const {token} = user.data;
      // set token to localstorage
      localStorage.setItem('token', token);
      // set token to header
      setAuthToken(token);
      // decode to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

//  log user out
export const logUserOut = () => dispatch => {
  // remove token from localstorage
  localStorage.removeItem('token');
  // remove authheader for future requests
  setAuthToken(false);
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
};
// set  loading
export const setLoading = () => {
  return {
    type: LOADING
  };
};