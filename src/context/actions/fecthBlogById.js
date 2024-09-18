import React from 'react'
import axios from 'axios'

export async function fecthBlogById(id) {

     try {
        const response = await axios.post("blog-detail1",{
            "id": id
        });
        return response.data
      } catch (error) {
        console.error(error);
      }  

}

