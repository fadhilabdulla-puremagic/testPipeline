import React from 'react'
import './content.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

// this element will fill up space between header and footer until content is loaded 
export function LoadingElement() {
  return (
    <>
    <LoadingSpinner/>
    <div className='main-element'>
        <h1>Loading .... </h1>
    </div>
    </>
  )
}


