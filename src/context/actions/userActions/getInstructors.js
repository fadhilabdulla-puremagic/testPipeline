import React from 'react'
import axios from 'axios'

export async function getInstructors() {
    
  try {
        
    const { data } = await axios.get(
      "instructor-details1"
    )

           return data

      } catch (error) {
                
      }
}

