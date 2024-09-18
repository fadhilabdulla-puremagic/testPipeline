import React from 'react'
import axios from 'axios'



export async function checkEmailPassword(token) {


    try {
        const response = await axios.post('check-email-password', {
            token:token
        })

        return response

    } catch (error) {
        return error
    }
}
