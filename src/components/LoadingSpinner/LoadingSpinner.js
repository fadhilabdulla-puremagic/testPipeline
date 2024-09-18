import React from 'react'
import './spinner.css'




export function LoadingSpinner() {
  return (
    <div className="spinner-container">
        <img src={process.env.PUBLIC_URL + "/images/loading-gif.gif" }/>
    </div>
  )
}


