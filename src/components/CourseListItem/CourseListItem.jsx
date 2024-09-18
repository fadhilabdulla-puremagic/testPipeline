import { Link } from "react-router-dom";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import i18n from "../../i18n/i18n";

const CourseListItems = ({ course }) => {
    if (!course){console.log("isse")}
    const handleImageLoad = () => { setIsLoading(false); };
    const [isLoading, setIsLoading] = useState(true);
    const { status } = course;
    return (
      <div className="col-lg-3 col-md-6 d-flex">
        {/* Single Courses Start */}
        <div className="single-courses w-100">
          <div className="courses-images">
            {isLoading && <Spinner animation="border" variant="primary" />}

            {status === "coming soon" || status !== "active" ? (
              <Link to={`/course/${course.slug ?? course.id}`}>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    "uploads/course_items/" +
                    course.course_image
                  }
                  alt={`${course.course_name}`}
                  onLoad={handleImageLoad}
                  style={{ visibility: isLoading ? "none" : "visible" }}
                />
              </Link>
            ) : (
              <Link to={`/course/${course.slug ?? course.id}`}>
                <img
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    "uploads/course_items/" +
                    course.course_image
                  }
                  alt={`${course.course_name}`}
                  onLoad={handleImageLoad}
                  style={{ visibility: isLoading ? "none" : "visible" }}
                />
              </Link>
            )}
          </div>
          <div className="courses-content">
            <div className="courses-author">
              <div className="author">
                <div className="author-thumb">
                  {isLoading && <Spinner animation="border" />}
                  {/* <Link to={`/course-detail/${course.id}`}><img src={'http://localhost:9000/uploads/instructor_images/'+course.instructor_image}  */}
                  <Link to={`/course/${course.slug ?? course.id}`}>
                    <img
                      src={
                        course.instructor_image !== "" &&
                        process.env.REACT_APP_IMAGE_URL +
                        "/uploads/instructor_images/" +
                        course.instructor_image
                      }
                      alt={`${course.instructor_name}`}
                      onLoad={handleImageLoad}
                      style={{ display: isLoading ? "none" : "block" }}
                    />
                  </Link>
                </div>
                <div className="author-name">
                  <Link
                    className="name"
                    to={`/course/${course.slug ?? course.id}`}
                  >
                    {course.instructor_name}
                  </Link>
                </div>
              </div>
            </div>
            <div className="tag-container">
              <div className="tag">
                <Link to={`/course/${course.slug ?? course.id}`}>
                  {course.category_name}
                </Link>
              </div>
            </div>
            <h4 className="title" style={{ marginTop: "-2px" }}>
              <Link to={`/course/${course.slug ?? course.id}`}>
                {course.course_name}
              </Link>
            </h4>
            {course.bln_limitted_offer === 1 && <span className="bold text-danger" style={{ fontSize: '13px'}}>Limited Seats</span>}
            <div className="courses-meta" style={{ marginTop: "-8px" }}>
              <span>
                {" "}
                <i className="icofont-clock-time" /> {course.duration}
              </span>
              <span>
                {" "}
                <i className="icofont-read-book" /> {course.no_lectures}{" "}
              </span>
            </div>
            {status === "coming soon" || status !== "active" ? (
              <div
                className="courses-price-review d-block bg-primary text-white text-center font-weight-bold"
                style={{ fontWeight: "bold" }}
              >
                {i18n.t('CommingSoon')}
              </div>
            ) : (
              <div className="courses-price-review bg-primary text-white font-weight-bold">
                <div className="courses-price" style={{ fontWeight: "bold" }}>
                  {course.bln_request_quote === 1 ? "Request Quote" :
                    course.price === 0 ||
                      course.price === "" ||
                      course.price === undefined ||
                      course.price === null ? (
                      "Free"
                    ) : (
                      <span className="sale-price" style={{ fontWeight: "bold" }}>

                        {i18n.t('AED')} {course.price}
                      </span>
                    )}
                  <span className="old-parice">{course.previous_price}</span>
                </div>
                <div className="courses-review">
                  <Link to={`/course/${course.slug ?? course.id}`}>Read More</Link>
                </div>
                {/*<div className="courses-review">
                     <span className="rating-count">4.9</span>
                     <span className="rating-star">
                       <span className="rating-bar" style={{width: '80%'}} />
                     </span>
                   </div>*/}
              </div>
            )}
          </div>
        </div>
        {/* Single Courses End */}
      </div>
    );
  };

export default CourseListItems;