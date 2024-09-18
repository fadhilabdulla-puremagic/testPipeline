import React from 'react'
import axios from 'axios'

export const sendPaymentSuccess = async (amount, courses, paymentId, status, user) => {
  
    try {
        const response = await axios.post("webhooks/stripe", {
          amount: amount,
          courses: courses.map(course => {
            // console.log(course)
            return {
              name: course.course_name,
              price: course.price
            };
          }),
          payment_id: paymentId,
          status: status,
          user: {
            name: user.firstname,
            email: user.email
          }
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
}

