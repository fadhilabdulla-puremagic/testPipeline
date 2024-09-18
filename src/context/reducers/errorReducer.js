export const errorReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };