export const authReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        localStorage.setItem('token', action.payload);
        return {
          ...state,
          token: action.payload,
        };
      case 'REMOVE_TOKEN':
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
        };
      default:
        return state;
    }
  };
  
  