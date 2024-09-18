import axios from "axios";
import { addError } from "./errorActions";

import {
  ADD_COURSE,
  EDIT_COURSE,
  DELETE_COURSE,
  SET_COURSES,
} from "../constants/courseConstants";

const removeCourse = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COURSE, payload: id });
};

const addCourse = (course) => async (dispatch) => {
  dispatch({ type: ADD_COURSE, payload: course });
};

const editCourse = (course) => async (dispatch) => {
  dispatch({ type: EDIT_COURSE, payload: course });
};

export const listCourses = async (dispatch) => {
  try {
    const { data } = await axios.get( "courses1");

    //  console.log(data)

    dispatch({
      type: "SET_COURSES",
      payload: data,
    });
  } catch (error) {
    // console.log(error.message)
    addError(dispatch, error.message);
  }
};

export const listCategoryCourses = async (id, dispatch) => {
  try {
    const { data } = await axios.get(
       `courses/category1/${id}`
    );
    //  console.log(data)
    dispatch({
      type: "SET_COURSES",
      payload: data,
    });

    return {};
  } catch (error) {
    // console.log(error.message)
    addError(dispatch, error.message);
  }
};

export const apiApplySearchFilter = async (search, dispatch) => {
  try {
    const { data } = await axios.post(
       `search1?keyword=${search}`
    );

    return data;
  } catch (error) {
    // console.log(error.message)
    addError(dispatch, error.message);
  }
};

export const apiGetRelatedCourses = async (courseId) => {
  try {
    const { data } = await axios.get(
       `other_courses1/${courseId}`
    );

    return data;
  } catch (error) {
    // console.log(error.message)
  }
};

export const apiGetSpecialOffers = async () => {
  try {
    const { data } = await axios.get(
       `get-special-offer-courses1`
    );

    return data;
  } catch (error) {
    // console.log(error.message)
  }
};

export const apiGetUpcomingEvents = async () => {
  try {
    const { data } = await axios.get(
       `get-upcoming-events1`
    );

    return data;
  } catch (error) {
    // console.log(error.message)
  }
};
