import React from 'react'
import axios from 'axios'

export async function metaTags(type,id) {
    const response = await axios.get("geta-meta-tags1/"+type+"/"+id)
    return response.data;
}