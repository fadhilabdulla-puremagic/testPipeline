import axios from 'axios';


const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';


export const addUser = (user, dispatch) => {
    return {
      type: ADD_USER,
      payload: user
    }
  };
  
  export const removeUser = () => {
    return {
      type: REMOVE_USER,
      payload: null
    }
  };
  
  export const updateUser = (user, dispatch) => {
    return {
      type: UPDATE_USER,
      payload: user
    }
  };
  
  export const deleteUser = () => {
    return {
      type: DELETE_USER
    }
  };
  

  export const updateLanguage = (language) => {
    return {
      type: UPDATE_LANGUAGE,
      payload: {language}
    }
  };
  // Define async action creator for adding a user with JWT authentication
  export const addUserWithJwt = async (token ,dispatch) => {
      try {

        if(token.length < 1){
          return;
        }
        const response = await axios.post("loginjwt", {token});
        //console.log(response);
        //console.log(response.data.user)
        if (response.data.user) {
          dispatch(addUser(response.data.user));
        }
        
        //console.log(response.data.user)
      } catch (error) {
        // console.error(error);
      }
    
  }

  export const removeUserWithJwt = async (dispatch) => {
      dispatch(removeUser())
  }

  export const paymentDetailAction = async (course, user, paymentIntent) =>  {
  
    try {
      const response = await axios.post("payment-detail", {
        "amount": paymentIntent.amount,
        "currency": paymentIntent.currency,
        "client_secret": paymentIntent.client_secret,
        "payment_id": paymentIntent.id,
        "course_id":course.id,
        "course_name":course.course_name,
        "status": paymentIntent.status,
        "user_id": user.id
      });
      
      return response.data
    } catch (error) {
      console.error(error);
    }
 
}

export const addToCartItem = async (cart, user, paymentIntent) => {
  //console.log(cart)
  try {
    const response = await axios.post("cart-save", {
            'course_name' : cart.course_name,
            'course_language' : cart.course_language,
            'course_level' : cart.course_level,
            'course_duration' : cart.course_duration,
            'no_lectures'  : cart.no_lectures,
            'description' : cart.description,
            'course_image' : cart.course_image,
            'price' :  cart.price,
            'course_previous_price' : cart.course_previous_price,
            'certificate' : cart.certificate,
            'instructor_name' : cart.instructor_name,
            'instructor_image' : cart.instructor_image,
            'curriculum' : cart.curriculum,
            'certification' : cart.certification,
            'video_url' : cart.video_url,
            'user_id' : user.id,
            'payment_id' : paymentIntent.id,
            'status' : 'paid',
            'course_id' : cart.id,
    });
    //console.log(response.data)
    return response.data
    
  } catch (error) {
    console.error(error);
  }

}

export const updateCartItem = async (course, user, paymentIntent) => {
 

  try {
    const response = await axios.post('cart-update',{
      'course_id':course.id,
      'status' : 'paid',
      'payment_id':paymentIntent.id,
      'user_id':user.id
    } );
    //console.log(response.data)
    return response.data
    
  } catch (error) {
    console.error(error);
  }

}