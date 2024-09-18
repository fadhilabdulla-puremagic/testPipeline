import React from 'react'
import axios from 'axios'



export async function checkPasswordEmail(token) {


    try {
        const response = await axios.post("check-password-email", {
            token:token
        })

        return response

    } catch (error) {
        return error
    }
}
