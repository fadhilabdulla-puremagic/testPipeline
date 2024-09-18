import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructors } from "../../context/actions/userActions/getInstructors";
import { Spinner } from "react-bootstrap";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

function About() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    async function fetchInstructor() {
      const response = await getInstructors();
      setInstructors(response);
      console.log(response);
    }
    fetchInstructor();

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 2);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  const InstructorLoop = ({ instructor }) => {
    return (
      <>
        <div className="col">
          {/* Single Team Start */}
          <div className="single-team">
            <div className="team-thumb">
              <img
                alt={instructor.instructor_name}
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  "uploads/instructor_images/" +
                  instructor.instructor_image
                }
                style={{ height: "8rem", width: "8rem" }}
              />
            </div>
            <div className="team-content">
              {/*<div className="rating">
                      <span className="count">4.9</span>
                      <i className="icofont-star" />
                      <span className="text">(rating)</span>
                    </div>*/}
              <h4 className="name">{instructor.instructor_name}</h4>
              <h4 className="name"></h4>
              <span className="designation">
                {instructor.instructor_domain}, Instructor
              </span>
            </div>
          </div>
          {/* Single Team End */}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="section page-banner">
        <img
          className="shape-1 animation-round"
          src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
        />
        <img
          className="shape-2"
          src={process.env.PUBLIC_URL + "/images/shape/shape-23.png"}
        />
        <div className="container">
          {/* Page Banner Start */}
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li className="active">About</li>
            </ul>
            <h2 className="title">
              {i18n.t('HeaderAbout')} <span>{i18n.t('HeaderUpgradeSkills')}.</span>
            </h2>
          </div>
          {/* Page Banner End */}
        </div>
        {/* Shape Icon Box Start */}
        <div className="shape-icon-box">
          <img
            className="icon-shape-1 animation-left"
            src={process.env.PUBLIC_URL + "/images/shape/shape-5.png"}
          />
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge" />
            </div>
          </div>
          <img
            className="icon-shape-2"
            src={process.env.PUBLIC_URL + "/images/shape/shape-6.png"}
          />
        </div>
        {/* Shape Icon Box End */}
        <img
          className="shape-3"
          src={process.env.PUBLIC_URL + "/images/shape/shape-24.png"}
        />
        <img
          className="shape-author"
          src={process.env.PUBLIC_URL + "/images/author/author-11.jpg"}
        />
      </div>

      <div className="section">
        <div className="section-padding-02 mt-n10">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* About Images Start */}
                <div className="about-images">
                  <div className="images">
                    <img src={process.env.PUBLIC_URL + "/images/about.jpg"} />
                  </div>
                  <div className="about-years">
                    <div className="years-icon">
                      <img
                        src={process.env.PUBLIC_URL + "/images/logo-icon.png"}
                      />
                    </div>
                    <p>
                      <strong>3+</strong> Years of Knowledge Sharing
                    </p>
                  </div>
                </div>
                {/* About Images End */}
              </div>
              <div className="col-lg-6">
                {/* About Content Start */}
                <div className="about-content">
                  <h5 className="sub-title">{i18n.t('WelcometoUpgradeSkills')}.</h5>
                  <h2 className="main-title">
                    {i18n.t('Joinwithusandupgradetoa')} <span>{i18n.t('brighterfuture')}</span>
                  </h2>
                  <br />
                  {/*<p>Lorem Ipsum has been the industr’s standard dummy text ever since unknown printer took galley type and scmbled make type specimen book. It has survived not only five centuries.</p>*/}
                  <Link
                    to="/courses"
                    className="btn btn-primary btn-hover-dark"
                  >
                    {i18n.t('startacoursebtn')}
                  </Link>
                </div>
                {/* About Content End */}
              </div>
            </div>
          </div>
        </div>
        <div className="section-padding-02 mt-n6">
          <div className="container">
            {/* About Items Wrapper Start */}
            <div className="how-it-work-wrapper">
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-1"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-transparency" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t('FlowShareyourKnowledge')}</h3>
                  <p>
                   {i18n.t('FlowDescriptionMakeyourvideo')}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="work-arrow">
                <img
                  className="arrow"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
                />
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-2"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-forms" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t('FlowChangePeoplesLives')}</h3>
                  <p>
                    {i18n.t('FlowDescriptionBetheinspiration')}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="work-arrow">
                <img
                  className="arrow"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
                />
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-3"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-16.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-badge" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t('FlowLifetimeEarnings')}</h3>
                  <p>
                    {i18n.t('FlowDescriptionAgreatchanceforyou')}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
            </div>
            {/* About Items Wrapper End */}
          </div>
        </div>
      </div>

      <div className="section section-padding-02">
        <div className="container">
          {/* Call to Action Wrapper Start */}
          <div className="call-to-action-wrapper">
            <img
              className="cat-shape-01 animation-round"
              src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"}
            />
            <img
              className="cat-shape-02"
              src={process.env.PUBLIC_URL + "/images/shape/shape-13.svg"}
            />
            <img
              className="cat-shape-03 animation-round"
              src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"}
            />
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* Section Title Start */}
                <div className="section-title shape-02">
                  <h5 className="sub-title">{i18n.t('JoinBecomeAnInstructor')}</h5>
                  <h2 className="main-title">
                    {i18n.t('JoinYoucanjoinwithUpgradeSkills')}
                    <span> {i18n.t('JoinInstructor')}</span>
                  </h2>
                </div>
                {/* Section Title End */}
              </div>
              <div className="col-md-6">
                <div className="call-to-action-btn">
                  <Link
                    className="btn btn-primary btn-hover-dark"
                    to="/contact"
                  >
                    {i18n.t('JoinDropInformationbtn')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action Wrapper End */}
        </div>
      </div>

      <div className="section section-padding mt-n1">
        <div className="container">
          {/* Section Title Start */}
          <div className="section-title shape-03 text-center">
            <h5 className="sub-title">{i18n.t('Instructors')}</h5>
            <h2 className="main-title">
              {i18n.t('InstructorsOurSkilled')} <span> {i18n.t('InstructorsInstructors')}</span>
            </h2>
          </div>
          {/* Section Title End */}
          {/* Team Wrapper Start */}
          <div className="team-wrapper">
            <div className="row row-cols-lg-5 row-cols-sm-3 row-cols-2 ">
              {instructors ? (
                instructors &&
                instructors.map((instructor) => {
                  return (
                    <InstructorLoop
                      instructor={instructor}
                      key={instructor.id}
                    />
                  );
                })
              ) : (
                <Spinner />
              )}
              {/* Single Team End */}
            </div>
          </div>
          {/* Team Wrapper End */}
        </div>
      </div>

      {/*<div className="section section-padding">
        <div className="container">
         
          <div className="brand-logo-wrapper">
            <img className="shape-1" src={process.env.PUBLIC_URL + "/images/shape/shape-19.png" } />
            <img className="shape-2 animation-round" src={process.env.PUBLIC_URL + "/images/shape/shape-20.png" } />
           
            <div className="section-title shape-03">
              <h2 className="main-title">Best Supporter of <span> Upgrade Skills.</span></h2>
            </div>
            
            <div className="brand-logo brand-active">
              <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                <div className="swiper-wrapper" id="swiper-wrapper-43d7c1f9bc104e5ed" aria-live="off" style={{transform: 'translate3d(-1395px, 0px, 0px)', transitionDuration: '600ms'}}><div className="single-brand swiper-slide swiper-slide-duplicate" data-swiper-slide-index={1} role="group" aria-label="1 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-02.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} role="group" aria-label="2 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-03.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index={3} role="group" aria-label="3 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-04.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index={4} role="group" aria-label="4 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-05.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index={5} role="group" aria-label="5 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-06.png"  }/>
                  </div>
                 
                  <div className="single-brand swiper-slide" data-swiper-slide-index={0} role="group" aria-label="6 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-01.png"  }/>
                  </div>
                  
                  <div className="single-brand swiper-slide" data-swiper-slide-index={1} role="group" aria-label="7 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-02.png"  }/>
                  </div>
                  
                  <div className="single-brand swiper-slide" data-swiper-slide-index={2} role="group" aria-label="8 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-03.png"  }/>
                  </div>
                  
                  <div className="single-brand swiper-slide swiper-slide-prev" data-swiper-slide-index={3} role="group" aria-label="9 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-04.png"  }/>
                  </div>
                 
                  <div className="single-brand swiper-slide swiper-slide-active" data-swiper-slide-index={4} role="group" aria-label="10 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-05.png"  }/>
                  </div>
                  
                  <div className="single-brand swiper-slide swiper-slide-next" data-swiper-slide-index={5} role="group" aria-label="11 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-06.png"  }/>
                  </div>
                  
                  <div className="single-brand swiper-slide swiper-slide-duplicate" data-swiper-slide-index={0} role="group" aria-label="12 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-01.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate" data-swiper-slide-index={1} role="group" aria-label="13 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-02.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate" data-swiper-slide-index={2} role="group" aria-label="14 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-03.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index={3} role="group" aria-label="15 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-04.png"  }/>
                  </div><div className="single-brand swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index={4} role="group" aria-label="16 / 16" style={{width: '110px', marginRight: '45px'}}>
                    <img src={process.env.PUBLIC_URL + "/images/brand/brand-05.png"  }/>
                  </div></div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true" /></div>
            </div>
            
          </div>
          
        </div>
      </div>*/}
    </div>
  );
}

export default About;
