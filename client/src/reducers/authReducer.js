import {LOADING, SET_CURRENT_USER} from '../actions/types';
import isEmpty                     from '../utils/is-empty'
const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
