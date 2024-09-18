import React from 'react'
import axios from 'axios'

export async function showCategories() {
    try {
        
        const { data } = await axios.get(
          "categories"
        )
          
          return data;

          } catch (error) {
            // console.log(error.message)
        
          }
}

export async function getCourseCategories() {
  try {
    const { data } = await axios.get(
      "course-categories1"
    )
  
    return data;

  } catch (error) {
    // console.log(error.message)
  }
}


