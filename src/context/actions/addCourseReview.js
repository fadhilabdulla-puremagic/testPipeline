import React from 'react'
import axios from 'axios'

export async function addCourseReview(name, email, review, image, courseid) {

    try {
        const response = axios.post("add-course-review", {
            name:name,
            email:email,
            review:review,
            image:image,
            courseid:courseid
        })

        return response;

    } catch (error) {
        console.log(error)
    }
    
}
