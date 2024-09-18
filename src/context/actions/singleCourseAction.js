import axios from 'axios';
import {addError} from './errorActions';

import {
    ADD_COURSE,
    EDIT_COURSE,
    DELETE_COURSE,
    SET_COURSES,
} from '../constants/courseConstants';

  const removeCourse = (id) => async (dispatch) =>{
    dispatch({ type: DELETE_COURSE, payload: id})
  }

  const addCourse = (course) => async (dispatch)  => {
    dispatch({type: ADD_COURSE, payload: course})
  }

  const editCourse = (course) => async (dispatch) => {
    dispatch({type: EDIT_COURSE, payload: course})
  }

export const listCourse = async (dispatch, id) => {
  
  try {
        
    const { data } = await axios.get(
      `course/${id}`
    )

          //  console.log(data)

          dispatch({
          type: 'SET_COURSE',
          payload: data
        })

      } catch (error) {
        console.log(error.message)
        addError(dispatch, error.message)
        
      }

  }
