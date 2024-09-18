import React, { createContext, useReducer } from 'react';
import { coursesInitialState } from './states/initialState';
import { courseReducer } from './reducers/CourseReducer';
import { singleCourseReducer } from './reducers/singleCourseReducer';
import {singleCourseInitialState} from './states/initialState'
import {cartInitialState} from './states/initialState'
import { authInitialState } from './states/initialState';
import { authReducer } from './reducers/authReducer';
import { userReducer } from './reducers/userReducer';
import { initialUserState } from './states/initialState';
import {cartReducer} from './reducers/cartReducer'


// Create Context

export const GlobalContext = createContext({});

// Provider Component
export const GlobalProvider = ({ children }) => {
 
  const [courseState, courseDispatch] = useReducer(courseReducer, coursesInitialState);
  const [singleCourseState, SingleCourseDispatch] = useReducer(singleCourseReducer, singleCourseInitialState);
  const [singleCartState, singlecartDispatch] = useReducer(cartReducer, cartInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);


  return (
    <GlobalContext.Provider 
    value={{
           courseState, 
           courseDispatch,
           singleCourseState,
           SingleCourseDispatch,
           singleCartState,
           singlecartDispatch,
           authState,
           authDispatch,
           userState,
           userDispatch,
           
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
