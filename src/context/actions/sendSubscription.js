import React from 'react'
import axios from 'axios'

export const SendSubscription = async (email) => {
    try {
        const response = await axios.post("subscriptions",{
          'email':email,
        });
        return response.data
      } catch (error) {
        console.error(error);
      }   
}


