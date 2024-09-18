import React from 'react'
import axios from 'axios'

export async function setPassword(id,password) {
  try {
    const response = await axios.post("change-password", {
      'id': id,
      'password': password
    });
    return response;
  } catch (error) {
    console.log('Error:', error);
    return error;
  }
}
