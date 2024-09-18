// Define action types
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';

export function userReducer(state , action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null
      };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user.map(user => user.id === action.payload.id ? action.payload : user)
      };

    case UPDATE_LANGUAGE:
      localStorage.setItem("lang", action.payload.language);
      return {
        ...state,
        language: action.payload.language
      };

    default:
      return state;
  }
}


