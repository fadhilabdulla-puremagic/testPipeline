import React from 'react'
import { Link } from 'react-router-dom'
import i18n from '../../i18n/i18n'

export function BecomeInstructor() {
  return (
    <div className="section section-padding-02" style={{marginBottom:'30px', marginTop:'-20px'}}>
        <div className="container">
          {/* Call to Action Wrapper Start */}
          <div className="call-to-action-wrapper">
            <img className="cat-shape-01 animation-round"src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"  }/>
            <img className="cat-shape-02"src={process.env.PUBLIC_URL + "/images/shape/shape-13.svg"  }/>
            <img className="cat-shape-03 animation-round"src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"  }/>
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* Section Title Start */}
                <div className="section-title shape-02">
                  <h5 className="sub-title">{i18n.t('JoinSecBeAnInstructor')}</h5>
                  <h2 className="main-title">{i18n.t('JoinUpgradeSkillsAsAnInstructor')} <span>{i18n.t('Instructor')}</span></h2>
                </div>
                {/* Section Title End */}
              </div>
              <div className="col-md-6">
                <div className="call-to-action-btn">
                  <Link className="btn btn-primary btn-hover-dark" to="contact.html">{i18n.t('JoinDropInformationBtn')}</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action Wrapper End */}
        </div>
    </div>
  )
}

