import React from 'react'
import { Link } from 'react-router-dom'
import DownloadApp from '../SubComponents/DownloadApp'


function Faq() {
  return (
    <div>
        <div className="section page-banner">
        <img className="shape-1 animation-round" src="images/shape/shape-8.png" alt="Shape" />
        <img className="shape-2" src="images/shape/shape-23.png" alt="Shape" />
        <div className="container">
          {/* Page Banner Start */}
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li><Link to="#">Home</Link></li>
              <li className="active">FAQ</li>
            </ul>
            <h2 className="title">Frequently Asked <span>Question.</span></h2>
          </div>
          {/* Page Banner End */}
        </div>
        {/* Shape Icon Box Start */}
        <div className="shape-icon-box">
          <img className="icon-shape-1 animation-left" src="images/shape/shape-5.png" alt="Shape" />
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge" />
            </div>
          </div>
          <img className="icon-shape-2" src="images/shape/shape-6.png" alt="Shape" />
        </div>
        {/* Shape Icon Box End */}
        <img className="shape-3" src="images/shape/shape-24.png" alt="Shape" />
        <img className="shape-author" src="images/author/author-11.jpg" alt="Shape" />
        </div>

        <div className="section section-padding">
        <div className="container">
          {/* FAQ Tab Menu Start */}
          <div className="faq-tab-menu">
            <ul className="nav nav-justified">
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab1">UI/UX Design</button></li>
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">Development</button></li>
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab3">Data Science</button></li>
              <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tab4">Business</button></li>
              <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab5">Financial</button></li>
            </ul>
          </div>
          {/* FAQ Tab Menu End */}
          {/* FAQ Tab Content Start */}
          <div className="tab-content">
            <div className="tab-pane fade" id="tab1">
              {/* FAQ Wrapper Start */}
              <div className="faq-wrapper">
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What’s the difference between a college and a university?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">Is it possible to obtain a bachelor's degree and a master's degree at the same time?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">How do you transfer from a community college to a four year university? </h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
              </div>
              {/* FAQ Wrapper End */}
            </div>
            <div className="tab-pane fade" id="tab2">
              {/* FAQ Wrapper Start */}
              <div className="faq-wrapper">
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What’s the difference between a college and a university?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">Is it possible to obtain a bachelor's degree and a master's degree at the same time?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">How do you transfer from a community college to a four year university? </h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
              </div>
              {/* FAQ Wrapper End */}
            </div>
            <div className="tab-pane fade" id="tab3">
              {/* FAQ Wrapper Start */}
              <div className="faq-wrapper">
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What’s the difference between a college and a university?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">Is it possible to obtain a bachelor's degree and a master's degree at the same time?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">How do you transfer from a community college to a four year university? </h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
              </div>
              {/* FAQ Wrapper End */}
            </div>
            <div className="tab-pane fade active show" id="tab4">
              {/* FAQ Wrapper Start */}
              <div className="faq-wrapper">
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What’s the difference between a college and a university?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">Is it possible to obtain a bachelor's degree and a master's degree at the same time?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">How do you transfer from a community college to a four year university? </h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
              </div>
              {/* FAQ Wrapper End */}
            </div>
            <div className="tab-pane fade" id="tab5">
              {/* FAQ Wrapper Start */}
              <div className="faq-wrapper">
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What’s the difference between a college and a university?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">What is the academic calendar for universities in the United States?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">Is it possible to obtain a bachelor's degree and a master's degree at the same time?</h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
                {/* Single FAQ Item Start */}
                <div className="single-faq-item">
                  <div className="row align-items-center">
                    <div className="col-lg-5">
                      <div className="faq-title">
                        <h4 className="title">How do you transfer from a community college to a four year university? </h4>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="faq-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single FAQ Item End */}
              </div>
              {/* FAQ Wrapper End */}
            </div>
          </div>
          {/* FAQ Tab Content End */}
          {/* FAQ Button End */}
          <div className="faq-btn text-center">
            <Link className="btn btn-primary btn-hover-dark" to="#">Other’s Question</Link>
          </div>
          {/* FAQ Button End */}
        </div>
        </div>

        <DownloadApp/>

    </div>
  )
}

export default Faq
