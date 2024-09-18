import React from "react"
import './error.css'


export const ErrorDisplay = ({message}) => {
    return (
      <div className='error-display'>
          <p style={{color:'white'}}>{message}</p>
      </div>
    )
  }