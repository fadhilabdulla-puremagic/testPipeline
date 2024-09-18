import React from 'react'
import { Link } from 'react-router-dom'
import './found.css'


export function NotFound() {
  return (
    <div className="not-found">
       
            <h1>404</h1>
            <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
            <h5>Looks Like you are lost</h5>
            <p>the page you are looking for not avaible!</p>
            <Link class="btn btn-primary btn-hover-dark" to="/">Go to Home</Link>
        
    </div>
  )
}


