import React from 'react'
import { Link } from 'react-router-dom'

function DownloadApp() {
  return (
    <div className="section section-padding download-section">
        <div className="app-shape-1" />
        <div className="app-shape-2" />
        <div className="app-shape-3" />
        <div className="app-shape-4" />
        <div className="container">
          {/* Download App Wrapper Start */}
          <div className="download-app-wrapper mt-n6">
            {/* Section Title Start */}
            <div className="section-title section-title-white">
              <h5 className="sub-title">Ready to start?</h5>
              <h2 className="main-title">Download our mobile app. for easy to start your course.</h2>
            </div>
            {/* Section Title End */}
            <img className="shape-1 animation-right" src={process.env.PUBLIC_URL+"/images/images/shape/shape-14.png" }/>
            {/* Download App Button End */}
            <div className="download-app-btn">
              <ul className="app-btn">
                <li><Link to="#"><img src={process.env.PUBLIC_URL+"/images/google-play.png" } /></Link></li>
                <li><Link to="#"><img src={process.env.PUBLIC_URL+"/images/app-store.png" } /></Link></li>
              </ul>
            </div>
            {/* Download App Button End */}
          </div>
          {/* Download App Wrapper End */}
        </div>
        </div>
  )
}

export default DownloadApp
