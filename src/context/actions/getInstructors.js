import React from 'react'
import axios from 'axios'

export async function getInstructors(id) {
    
    const response = await axios.post("get/instructors1/"+id)
    return response.data
}

