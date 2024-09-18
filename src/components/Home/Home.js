import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import SliderShape from "../SubComponents/SliderShape";
import { GlobalContext } from "../../context/GlobalState";
import { listCourses } from "../../context/actions/courseActions";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
// import { useNavigate } from "react-router-dom";
import "./tab.css";
// import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
// import { showLinks } from "../../context/actions/showLinks";
import { metaTags } from "../../context/actions/metaTags";
import HomePageCarousal from "../SubComponents/HomePageCarousel/HomePageCarousel";
import Sections from "./Sections/Sections";
import i18n from "../../i18n/i18n";
import CourseListItems from "../CourseListItem/CourseListItem";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [numCoursesToShow, setNumCoursesToShow] = useState(12);
  const { courseState, courseDispatch, singleCartState, singlecartDispatch } = useContext(GlobalContext);

  const FetchCourse = async() => {setIsLoading(true);await listCourses(courseDispatch);setIsLoading(false)}

  // useEffect(() => {listCourses(courseDispatch);}, [courseDispatch]);
  useEffect( () => {
    FetchCourse()
    // Call the updateMetaTags function with the dynamic values
    window.scrollTo(0, 0);
    const meta_tags = metaTags(1, 1);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
    
  }, []);

  const handleShowMoreCourses = () => {setNumCoursesToShow(numCoursesToShow + 4);};
  const courseList = courseState.courses;
  

  return (
    <>
      {/* {spinner && <LoadingSpinner />} */}
      <div className="section home-slider-section">
        <HomePageCarousal />
      </div>
      <Sections />
      <div className="section">
        <div className="container">
          {/* All Courses Top Start */}
          {/* <div className="courses-top"> */}
          {/* Section Title Start */}
          {/* <div className="section-title shape-01 mt-2">
              <h2 className="main-title">
                All <span>Courses</span> of Upgrade Skills
              </h2>
            </div> */}
          {/* Section Title End */}
          {/* Courses Search Start */}
          {/* <div className="courses-search">
              <form action="#">
                <input
                  type="text"
                  placeholder="Search courses"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button>
                  <i className="flaticon-magnifying-glass" />
                </button>
              </form>
            </div> */}
          {/* Courses Search End */}
          {/* </div> */}

          {/**Draggable Slider */}
          {/* <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center  ",
            }}
          >
            <DraggableSlider
              object={categories}
              handleCategoryChange={handleCategoryChange}
              currentCategory={currentCategory}
            />
          </div> */}

          <div className="tab-content courses-tab-content">
            <div className="tab-pane fade show active" id="tabs1">
              {/* All Courses Wrapper Start */}
              <div className="courses-wrapper">
                <div className="row">
                {
                    isLoading && (<center>
                      <Spinner animation="border" variant="primary" />
                    </center>)
                  }
                  {courseList && courseList.length > 0 ? (
                    <>
                      {courseList
                        .slice(0, numCoursesToShow)
                        .map((course, key) => (
                          <CourseListItems course={course} key={key} />
                        ))}
                      {numCoursesToShow < courseList.length && (
                        <div className="courses-btn text-center">
                          <button
                            className="btn btn-secondary btn-hover-primary"
                            onClick={handleShowMoreCourses}
                          >
                            More Courses
                          </button>
                        </div>
                      )}
                    </>
                  ) : courseList === null ? (
                    <center>
                      <Spinner animation="border" variant="primary" />
                    </center>
                  ) : !isLoading && (
                    <div style={{ textAlign: "center" }}>
                      <h1>No Courses</h1>
                    </div>
                  )}
                  
                </div>
              </div>
              {/* All Courses Wrapper End */}
            </div>
          </div>
          {/* All Courses tab content End */}
          {/* All Courses BUtton Start */}

          {/* All Courses BUtton End */}
        </div>
      </div>

      <div className="section section-padding-02 mb-5">
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
                  <h5 className="sub-title">{i18n.t('JoinSecBeAnInstructor')}</h5>
                  <h2 className="main-title">
                    {i18n.t('JoinUpgradeSkillsAsAnInstructor')}<span> {i18n.t('Instructor')}!!</span>
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
                    {i18n.t('JoinDropInformationBtn')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action Wrapper End */}
        </div>
      </div>

      {/* <div className="section section-padding mt-n1">
        <div className="container">
          
          <div className="section-title shape-03 text-center">
            
            <h2 className="main-title">
              How It <span> Works?</span>
            </h2>
          </div>
         
          <div className="how-it-work-wrapper">
           
            <div className="single-work">
              <img
                className="shape-1"
                src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
              />
              <div className="work-icon">
                <i className="flaticon-transparency" />
              </div>
              <div className="work-content">
                <h3 className="title">Find Your Course</h3>
                <br />
                <br />
              
              </div>
            </div>
            
            <div className="work-arrow">
              <img
                className="arrow"
                src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
              />
            </div>
            
            <div className="single-work">
              <img
                className="shape-2"
                src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
              />
              <div className="work-icon">
                <i className="flaticon-forms" />
              </div>
              <div className="work-content">
                <h3 className="title">Book A Course</h3>
                <br />
                <br />
                
              </div>
            </div>
            
            <div className="work-arrow">
              <img
                className="arrow"
                src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
              />
            </div>
          
            <div className="single-work">
              <img
                className="shape-3"
                src={process.env.PUBLIC_URL + "/images/shape/shape-16.png"}
              />
              <div className="work-icon">
                <i className="flaticon-badge" />
              </div>
              <div className="work-content">
                <h3 className="title">Sharpen your skills</h3>
                <br />
                <br />
                
              </div>
            </div>
            
          </div>
        </div>
      </div> */}

      <SliderShape />
    </>
  );
}

export default Home;
