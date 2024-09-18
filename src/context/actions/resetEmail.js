import React from 'react'
import axios from 'axios'

export  async function resetEmail(email) {
    try {
        
        const response = await axios.post( "send-password-email", {
          email:email
        })
               return response
               
          } catch (error) {
            console.log(error)        
          }
}
