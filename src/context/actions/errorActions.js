export const addError = (dispatch, message) => {
    
    dispatch({
        type: 'SET_ERROR',
        payload: message
      });
}