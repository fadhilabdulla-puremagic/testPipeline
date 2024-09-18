export const singleCourseReducer = (state, action) => {
    switch (action.type) {
      case 'REMOVE_SINGLE_COURSE':
        return {
          ...state,
          courses: state.users.filter(course => {
            return course.id !== action.payload;
          })
        }
      case 'ADD_SINGLE_COURSE':
        return {
          ...state,
          courses: [action.payload, ...state.courses]
        }
      case 'SET_COURSE':
        return {
          course: action.payload
      }; 
      case 'EDIT_SINGLE_COURSE':
        const updateCourse = action.payload;
  
        const updateCourses = state.courses.map(course => {
          if (course.id === updateCourse.id) {
            return updateCourse;
          }
          return course;
        })
        return {
          ...state,
          courses: updateCourses
        }
  
      case 'DELETE_SINGLE_COURSE':
          return {
            ...state,
            todos: state.todos.filter((todo) => todo.id !== action.payload),
        };  
  
      default:
        return state;
    }
   }