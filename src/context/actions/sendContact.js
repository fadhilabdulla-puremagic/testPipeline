import React from 'react'
import axios from 'axios'

export const sendContact = async (contact) => {
    try {
        const response = await axios.post("save-detail",{
            "contact_no": contact.contact_no,
            'name': contact.name,
            'email': contact.email,
            'message':contact.message,
            'subject':contact.subject
        });
        return response.data
      } catch (error) {
        console.error(error);
      }   
}