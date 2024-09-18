import React from 'react'
import axios from 'axios'

export async function courseSections(id) {
    const response = await axios.get("all-course-section1/"+id)
    return response.data;
}

