/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
// import DownloadApp from "../SubComponents/DownloadApp";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect } from "react";
// import { listCourse } from "../../context/actions/singleCourseAction";
// import { addToCartItem } from "../../context/actions/userActions/userActions";
import { LoadingElement } from "../LoadingElement/LoadingElement";
import { getInstructors } from "../../context/actions/getInstructors";
// import { showLinks } from "../../context/actions/showLinks";
import { AnimatedTab } from "../AnimatedTab/AnimatedTab";
// import { addCourseReview } from "../../context/actions/addCourseReview";
// import { toast } from "react-toastify";
import { ErrorDisplay } from "../ErrorDisplay/ErrorDisplay";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { courseSections } from "../../context/actions/courseSections";
import { courseDetails } from "../../context/actions/courseDetails";
// import ReactHtmlParser from "react-html-parser";
import { VimeoPlayer } from "../ReactPlayer/VimeoPlayer";
import RelatedCourses from "./RelatedCourses";
import WebinarRegisterModal from "./WebinarRegisterModal/WebinarRegisterModal";
import CollapsePreview from "./CollapsePreview";
import Accordion from "react-bootstrap/Accordion";
import CoursePreviewModal from "./CoursePreviewModal";
import i18n from "../../i18n/i18n";


function CourseDetail() {
  const { userState } = useContext(GlobalContext);
  const user = userState.user;

  const [activeTab, setActiveTab] = useState("description");
  const [showReview, setShowReview] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [showWebinarRegisterModal, setShowWebinarRegisterModal] =
    useState(false);
  const toggleShowWebinarModal = () => {
    setShowWebinarRegisterModal((p) => !p);
  };
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleVideoReady = () => {
    alert("video is ready");
    setVideoLoaded(true);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  function handleReview() {
    setShowReview(true);
  }

  const formData = useRef({
    name: "",
    email: "",
    review: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedFormData = { ...formData.current, [name]: value };
    formData.current = updatedFormData;
    //console.log(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.current.email == "" ||
      formData.current.name == "" ||
      formData.current.review == ""
    ) {
      setLoading(true);
      setMessage("Please enter all details");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else if (!validateEmail(formData.current.email)) {
      setLoading(true);
      setMessage("Please enter a valid email");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
      return;
    } else {
      alert("Review Pending");
    }
  };

  const [instructors, setInstructor] = useState([]);

  const { id } = useParams();

  const { singleCartState, singlecartDispatch } = useContext(GlobalContext);
  const [courseRaw, setCourseRaw] = useState(null);

  const _handleClickPreview = (videoUrl)=>{
    setShowPreviewModal(videoUrl)
  }
  const getCourseDetails = async (id) => {
    const tempCourse = {
      details: null,
      sections: [],
      instructors: [],
    };

    try {
      const responseDetails = await courseDetails(id);
      if (!responseDetails){navigate("/")}
      tempCourse.details = responseDetails;
      
    } catch (error) {
      console.log(error);
    }

    tempCourse.id = tempCourse.details?.id;
    try {
      const responseSections = await courseSections(tempCourse.details?.id);
      tempCourse.sections = responseSections;
    } catch (error) {
      console.log(error);
    }

    try {
      const responseInstructor = await getInstructors(tempCourse.details?.id);
      tempCourse.instructors = responseInstructor;
    } catch (error) {
      console.log(error);
    }

    setCourseRaw(tempCourse);
    //update meta tags
    if (window.updateMetaTags) {
      window.updateMetaTags(
        tempCourse.details.meta_title,
        tempCourse.details.meta_description
      );
    }
  };

  useEffect(() => {
    getCourseDetails(id);

    return () => {
      setCourseRaw(null);
    };
  }, [id]);

  const handleEnroll = (course) => {

  
    //checks for enrolment

    //if this course is asking for enrolments
    if(course?.ask_enrolment_quantity === true){
      //check  if user provided any quantity
      const enrolment_quantity = parseInt(document.getElementById('input-enrolment-quantity').value);
     
      if(enrolment_quantity > 0){
        course.enrolment_quantity = enrolment_quantity;
      }else{
        document.getElementById('input-enrolment-quantity').scrollIntoView({behavior: 'smooth', block: 'center'});
		    document.getElementById('input-enrolment-quantity').focus({preventScroll: true});
        setTimeout(()=>{

          window.alert('Please enter number of enrolments.')
        }, 1000)
        return;
      }
    }


    singlecartDispatch({ type: "ADD_TO_CART", payload: course });
    //window.location.replace('https://codefrontend.com');
    navigate("/cart");
  };

  const isCourseInCart = (id) =>
    singleCartState.cart.some((item) => item.id === id);

  function SingleCourseComponent({ course }) {
    const {
      course_name,

      certificate,

      course_duration,
      course_language,
      course_level,

      instructor_image,
      instructor_name,
      no_lectures,
      price,
      video_url,
      bln_request_quote,

      course_type,
      status,
      webinar_time,
      course_module_preview,
    } = course.details;

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
    
      // Find the last whitespace character within the maxLength
      const truncatedText = text.slice(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    
      // If there's a space character, truncate at that position
      if (lastSpaceIndex > 0) {
        return truncatedText.slice(0, lastSpaceIndex) + '...';
      }
    
      // If no space found, fallback to cutting the text at maxLength
      return truncatedText + '...';
    };


    return (
      <>
        {showSpinner && <LoadingSpinner />}

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
            <div className="page-banner-content">
              <ul className="breadcrumb">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="active">Course Details</li>
              </ul>

              <h1 className="title">
                {" "}
                <span>Course Details</span>
                {/* <span > {truncateText(course_name, 40)}</span> */}
              </h1>
            </div>
          </div>
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
          <img
            className="shape-3"
            src={process.env.PUBLIC_URL + "/images/shape/shape-24.png"}
          />
          {course?.instructors.length === 1 ? (
            <img
              className="shape-author"
              style={ ['ur'].includes(i18n.language) ? { right:  '70%' } : {left:'80%'}}
              src={
                instructor_image !== ""
                  ? process.env.REACT_APP_IMAGE_URL +
                    `uploads/instructor_images/${instructor_image}`
                  : ""
              }
            />
          ) : (
            <></>
          )}
        </div>

        {/* course details section */}
        <div className="section section-padding mt-n10">
          <div className="container">
            <div className="row gx-10">
              <div className="col-lg-8">
                <div className="courses-details">
                  <h1 className="title mb-5">
                    {!["webinar", "workshop"].includes(course_type?.toLowerCase())  ? 
                      `${i18n.t('CourseDetailsOnlineCourse')} :`
                     : ( 
                      <></>
                    )}
                    <span> {course_name}</span>
                  </h1>

                  {video_url &&
                  (video_url.includes("youtube") ||
                    video_url.includes("vimeo")) ? (
                    <>
                      <div
                        className="courses-details-images"
                        style={{ paddingBottom: "56%" }}
                      >
                        <div className="video-wrapper">
                          {/* {!videoLoaded && <div className="loader">Loading video...</div>} */}
                          {video_url.includes("youtube") ? (
                            <VimeoPlayer
                              url={video_url}
                              onReady={handleVideoReady}
                            />
                          ) : (
                            <VimeoPlayer
                              url={video_url}
                              onReady={handleVideoReady}
                            />
                          )}
                        </div>
                      </div>
                      <h2 className="title">{course_name}</h2>
                    </>
                  ) : (
                    // <div className="courses-details-images">
                    //   <img
                    //     src="https://i.ytimg.com/vi/nbmJnCHXaW8/maxresdefault.jpg"
                    //     alt="Courses Details"
                    //   />
                    //   <span className="tags">{category_name}</span>
                    //   <div className="courses-play">
                    //     <img
                    //       src="/images/courses/circle-shape.png"
                    //       alt="Play"
                    //     />
                    //     <a className="play video-popup">
                    //       <i className="flaticon-play" />
                    //     </a>
                    //   </div>
                    // </div>
                    <></>
                  )}

                  <div
                    className="courses-details-admin"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridGap: "1em",
                    }}
                  >
                    {course?.instructors &&
                      course?.instructors.map((object, i) => (
                        <div className="admin-author" key={i}>
                          <div className="author-thumb">
                            {object.instructor_image && (
                              <img
                                src={
                                  process.env.REACT_APP_IMAGE_URL +
                                  `uploads/instructor_images/${object.instructor_image}`
                                }
                                alt="Author"
                              />
                            )}
                          </div>
                          {
                            <div className="author-content">
                              <div className="name" to={"/"}>
                                {object.instructor_name}
                              </div>
                              {/*<span className="Enroll">286 Enrolled Students</span>*/}
                            </div>
                          }
                        </div>
                      ))}
                  </div>
                  {/* Courses Details Tab Start */}
                  <div className="courses-details-tab">
                    {/* Details Tab Menu Start */}
                    {/* <div className="details-tab-menu">
                        <ul className="nav justify-content-center">
                          <li><button className="active" data-bs-toggle="tab" data-bs-target="#description">Description</button></li>
                          <li><button data-bs-toggle="tab" data-bs-target="#instructors">Instructors</button></li>
                          <li><button data-bs-toggle="tab" data-bs-target="#reviews">Reviews</button></li>
                        </ul>
                      </div> */}
                    {/* Details Tab Menu End */}
                    {/* Details Tab Content Start */}
                    <AnimatedTab
                      activeTab={activeTab}
                      handleTabClick={handleTabClick}
                    />
                    <div className="details-tab-content">
                      <div className="tab-content" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        {/* <div className="tab-pane fade show active" id="description"> */}
                        <div
                          className={`tab-pane fade ${
                            activeTab === "description" ? "active" : ""
                          }`}
                          id="description"
                        >
                          
                          {/* Tab Description Start */}
                          <div className="tab-description">
                          <Accordion defaultActiveKey="0">
                            {course?.sections &&
                              course?.sections.map((section, i) => {
                                return (
                                  <Accordion.Item eventKey={`${i}`}>
                                    <Accordion.Header><h5>{section.section_title}</h5></Accordion.Header>
                                    <Accordion.Body>
                                      
                                      <div>
                                        {
                                          section?.connect_module === 1 && 
                                          <CollapsePreview preview={section} _handleClickPreview={_handleClickPreview} />
                                        }
                                        <div dangerouslySetInnerHTML={{ __html: section.course_section_description }}></div>
                                      </div>
                                      
                                    </Accordion.Body>
                                  </Accordion.Item>
                                );
                              })}
                            </Accordion>
                          </div>
                          {/* Tab Description End */}
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "instructors" ? "active" : ""
                          }`}
                          id="instructors"
                        >
                          {/* Tab Instructors Start */}
                          <div className="tab-instructors">
                            <h3 className="tab-title">{i18n.t('CourseDetailsInstructors')}:</h3>
                            {course?.instructors &&
                              course?.instructors.map((object, i) => {
                                return (
                                  <div className="row my-2" key={i}>
                                    <div className="col-md-4 col-6">
                                      {/* Single Team Start */}
                                      <div className="single-team">
                                        <div className="team-thumb">
                                          {object.instructor_image && (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_IMAGE_URL +
                                                `uploads/instructor_images/${object.instructor_image}`
                                              }
                                              alt="Author"
                                              style={{
                                                height: "10rem",
                                                width: "10rem",
                                              }}
                                            />
                                          )}
                                        </div>

                                        <div className="team-content">
                                          <h4 className="name">
                                            {object.instructor_name}
                                          </h4>
                                          <span className="designation">
                                            {object.instructor_name}
                                          </span>
                                        </div>
                                      </div>
                                      {/* Single Team End */}
                                    </div>
                                    <div className="col-md-7 col-6">
                                      <p>{object?.about && object.about}</p>
                                    </div>
                                  </div>
                                );
                              })}

                            <div className="row gx-10">
                              <div className="col-lg-12">
                                <div className="tab-rating-content">
                                  {/*<h3 className="tab-title">About :</h3>
                                        <p>
                                           {instructors && instructors.length > 0 && instructors[0].about && instructors[0].about} 
                                        </p>  
                                    */}
                                </div>
                              </div>
                              <div className="col-lg-6">
                                {/* <div className="tab-rating-box">
                                    <span className="count">4.8 <i className="icofont-star" /></span>
                                    <p>Rating (86K+)</p>
                                    <div className="rating-box-wrapper">
                                      <div className="single-rating">
                                        <span className="rating-star">
                                          <span className="rating-bar" style={{width: '100%'}} />
                                        </span>
                                        <div className="rating-progress-bar">
                                          <div className="rating-line" style={{width: '75%'}} />
                                        </div>
                                      </div>
                                      <div className="single-rating">
                                        <span className="rating-star">
                                          <span className="rating-bar" style={{width: '80%'}} />
                                        </span>
                                        <div className="rating-progress-bar">
                                          <div className="rating-line" style={{width: '90%'}} />
                                        </div>
                                      </div>
                                      <div className="single-rating">
                                        <span className="rating-star">
                                          <span className="rating-bar" style={{width: '60%'}} />
                                        </span>
                                        <div className="rating-progress-bar">
                                          <div className="rating-line" style={{width: '500%'}} />
                                        </div>
                                      </div>
                                      <div className="single-rating">
                                        <span className="rating-star">
                                          <span className="rating-bar" style={{width: '40%'}} />
                                        </span>
                                        <div className="rating-progress-bar">
                                          <div className="rating-line" style={{width: '80%'}} />
                                        </div>
                                      </div>
                                      <div className="single-rating">
                                        <span className="rating-star">
                                          <span className="rating-bar" style={{width: '20%'}} />
                                        </span>
                                        <div className="rating-progress-bar">
                                          <div className="rating-line" style={{width: '40%'}} />
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                              </div>
                            </div>
                          </div>
                          {/* Tab Instructors End */}
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "reviews" ? "active" : ""
                          }`}
                          id="reviews"
                        >
                          {/* Tab Reviews Start */}
                          <div className="tab-reviews">
                            <h3 className="tab-title">Student Reviews:</h3>
                            <div className="reviews-wrapper reviews-active">
                              <div className="swiper-container">
                                <div className="swiper-wrapper">
                                  {/* Single Reviews Start */}
                                  <div className="single-review swiper-slide">
                                    <div className="review-author">
                                      <div className="author-thumb">
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/author/author-06.jpg"
                                          }
                                        />
                                        <i className="icofont-quote-left" />
                                      </div>
                                      <div className="author-content">
                                        <h4 className="name">Sara Alexander</h4>
                                        <span className="designation">
                                          Product Designer, USA
                                        </span>
                                        <span className="rating-star">
                                          <span
                                            className="rating-bar"
                                            style={{ width: "100%" }}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                    <p>
                                      Lorem Ipsum has been the industry's
                                      standard dummy text since the 1500 when
                                      unknown printer took a galley of type and
                                      scrambled to make type specimen book has
                                      survived not five centuries but also the
                                      leap into electronic type and book.
                                    </p>
                                  </div>
                                  {/* Single Reviews End */}
                                </div>
                              </div>
                            </div>

                            {!showReview && (
                              <div className="reviews-btn">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-hover-dark"
                                  onClick={handleReview}
                                >
                                  Write A Review
                                </button>
                              </div>
                            )}
                          </div>
                          {/* Tab Reviews End */}

                          {showReview && (
                            <div className="comment-form">
                              {loading && <ErrorDisplay message={message} />}
                              <h3 className="title">Leave a Review</h3>
                              {/* Form Wrapper Start */}
                              <div className="form-wrapper">
                                <form onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      {/* Form Wrapper Start */}
                                      <div className="single-form">
                                        <input
                                          type="text"
                                          placeholder="Name"
                                          name="name"
                                          onChange={handleChange}
                                          value={formData.current.name.value}
                                        />
                                      </div>
                                      {/* Form Wrapper End */}
                                    </div>
                                    <div className="col-md-6">
                                      {/* Form Wrapper Start */}
                                      <div className="single-form">
                                        <input
                                          type="email"
                                          placeholder="Email"
                                          name="email"
                                          onChange={handleChange}
                                          value={formData.current.email.value}
                                        />
                                      </div>
                                      {/* Form Wrapper End */}
                                    </div>
                                    <div className="col-md-12">
                                      {/* Form Wrapper Start */}
                                      <div className="single-form">
                                        <textarea
                                          placeholder="review"
                                          name="review"
                                          onChange={handleChange}
                                          value={formData.current.review.value}
                                        />
                                      </div>
                                      {/* Form Wrapper End */}
                                    </div>
                                    <div className="col-md-12">
                                      {/* Form Wrapper Start */}
                                      <div className="single-form text-center">
                                        <button className="btn btn-primary btn-hover-dark">
                                          Submit Now
                                        </button>
                                      </div>
                                      {/* Form Wrapper End */}
                                    </div>
                                  </div>
                                </form>
                              </div>
                              {/* Form Wrapper End */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Details Tab Content End */}
                  </div>
                  {/* Courses Details Tab End */}
                </div>
              </div>
              <div className="col-lg-4">
                {/* Courses Details Sidebar Start */}
                <div className="sidebar">
                  {/* Sidebar Widget Information Start */}
                  <div className="sidebar-widget widget-information">
                    {course_type && course_type?.toLowerCase() !== "webinar" ? (
                      <div className="info-price">
                        {status === "coming soon" ? (
                          <button className="btn btn-primary btn-hover-dark">
                            Coming Soon
                          </button>
                        ) :bln_request_quote === 0 && (
                          
                          <span className="price">
                            {" "}
                            {price === 0 ||
                            price === "" ||
                            price === undefined ||
                            price === null ? (
                              "Free"
                            ) : (
                              <span className="sale-price">{i18n.t('AED')} {price}</span>
                            )}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="info-price">
                        <span className="price">Webinar</span>
                      </div>
                    )}
                    <div className="info-list">
                      <ul>
                        <li>
                          <span>
                            <i className="icofont-man-in-glasses" />{" "}
                            <strong>{i18n.t('CourseDetailsInstructors')}</strong>{" "}
                          </span>
                          <span>
                            {instructor_name}{" "}
                            {course?.instructors?.length > 1
                              ? ` & ${course?.instructors?.length - 1} more `
                              : ""}
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="icofont-clock-time" />{" "}
                            <strong>{i18n.t('CourseDetailsDuration')}</strong>{" "}
                          </span>
                          <span>{course_duration}</span>
                        </li>
                        {no_lectures && no_lectures > 0 ? (
                          <li>
                            <span>
                              <i className="icofont-ui-video-play" />{" "}
                              <strong>{i18n.t('CourseDetailsLectures')}</strong> 
                            </span>
                            <span>{no_lectures}</span>
                          </li>
                        ) : (
                          <></>
                        )}
                        <li>
                          <span>
                            <i className="icofont-bars" /> <strong>{i18n.t('CourseDetailsLevel')}</strong>{" "}
                          </span>
                          <span>{course_level}</span>
                        </li>
                        <li>
                          <span>
                            <i className="icofont-book-alt" />{" "}
                            <strong>{i18n.t('CourseDetailsLanguage')}</strong>{" "}
                          </span>
                          <span>{course_language}</span>
                        </li>
                        <li
                          className={`${
                            course_type &&
                            course_type?.toLowerCase() === "webinar"
                              ? "d-none"
                              : ""
                          }`}
                        > 
                          <span>
                            <i className="icofont-certificate-alt-1" />{" "}
                            <strong>{i18n.t('CourseDetailsCertificate')}</strong>{" "}
                          </span>
                          <span>{certificate}</span>
                        </li>

                        <li
                          className={`${
                            course_type &&
                            course_type?.toLowerCase() !== "webinar"
                              ? "d-none"
                              : ""
                          }`}
                        >
                          <span>
                            <i className="icofont-calendar" />{" "}
                            <strong>{i18n.t('CourseDetailsDatenTime')}</strong>{" "}
                          </span>
                          <span>{webinar_time}</span>
                        </li>
                      </ul>
                    </div>
                    {course_type && (course_type?.toLowerCase() === "webinar" || course_type?.toLowerCase() === "workshop") ? (
                      <div className="info-btn">
                        <button
                          id="btn-webinar-register"
                          className="btn btn-primary btn-hover-dark"
                          onClick={toggleShowWebinarModal}
                        >
                          Register for free
                        </button>
                      </div>
                    ) : (status === "contact us") ?
                    (
                      <div className="info-btn">
                          <Link
                            id="btn-webinar-register"
                            to="/contact"
                            className="btn btn-primary btn-hover-dark"
                          >
                            Contact us
                          </Link>
                        </div>
                    )
                    : (
                      <div className="info-btn">
                        {status === "coming soon" ||
                        price === 0 ||
                        status !== "active" ? (
                          Boolean(user) ? (
                            <></>
                          ) : (
                            <Link
                              to={
                                price === 0
                                  ? "https://classes.upgrade-skills.com/login/"
                                  : "/register"
                              }
                              className="btn btn-primary btn-hover-dark"
                            >
                              {i18n.t('CourseDetailsRegister')}
                            </Link>
                          )
                        ) : bln_request_quote === 1 ? (
                            <Link className="btn btn-primary btn-hover-dark" to={"/contact"}>Contact Us</Link>
                        ) : (
                          <>
                            <div className={`${course?.details?.ask_enrolment_quantity ? 'd-flex' : 'd-none'} flex-column`}>
                              <label className="label pl-2" style={{textAlign:'left', paddingLeft:'8px'}}><strong>Total Enrolments</strong></label>
                              <input type="number" min={1} max={9}  id="input-enrolment-quantity" className="form-control" />
                            </div>
                            <button
                              id="EnrollNow"
                              className="btn btn-primary btn-hover-dark"
                              onClick={() => handleEnroll(course?.details)}
                              disabled={isCourseInCart(course?.details.id)}
                            >
                              Enroll Now
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sidebar Widget Share End */}
                </div>
                {/* Courses Details Sidebar End */}

                <RelatedCourses courseId={id} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {courseRaw !== undefined && courseRaw !== null ? (
        <>
          <SingleCourseComponent course={{ ...courseRaw }} />
          <WebinarRegisterModal
            show={showWebinarRegisterModal}
            toggleShow={toggleShowWebinarModal}
            webinarId={courseRaw.id}
            course={courseRaw}
          />
          {
            showPreviewModal && 
            <CoursePreviewModal videoUrl={showPreviewModal} _handleClickPreview={_handleClickPreview} />
          }
        </>
      ) : (
        <LoadingElement />
      )}
    </div>
  );
}

export default CourseDetail;
