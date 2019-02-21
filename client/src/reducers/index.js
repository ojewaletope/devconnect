import {combineReducers} from 'redux'
import authReducer from './authReducer/authReducer';
import errorReducer from './errorReducer/errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
})