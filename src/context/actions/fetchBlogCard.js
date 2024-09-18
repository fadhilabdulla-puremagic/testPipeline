import React from 'react'
import axios from 'axios'

export async function fetchBlogs() {
  try {
        
    const { data } = await axios.get(
      "get-blogs1"
    )

    return data;

    } catch (error) {
      console.log(error.message)

  }
}

export async function fetchBlogsCategories() {
  try {
        
    const { data } = await axios.get(
      "blog-category-count1"
    )

    return data;

    } catch (error) {
      console.log(error.message)

  }
}

