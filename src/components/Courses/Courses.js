/* eslint-disable jsx-a11y/alt-text */
import { React, useState } from "react";
import { Link } from "react-router-dom";
import DownloadApp from "../SubComponents/DownloadApp";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { listCourses } from "../../context/actions/courseActions";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";
import CourseListItems from "../CourseListItem/CourseListItem";

function Courses() {
  const navigate = useNavigate();
  const { courseState, courseDispatch, singleCartState, singlecartDispatch } =
    useContext(GlobalContext);
  const count = 0;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courseList = courseState.courses;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    listCourses(courseDispatch);
  }, [courseDispatch]);

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);
    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 5);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  useEffect(() => {
    const filtered = courseList.filter((course) => {
      return (
        course.course_name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
        -1
      );
    });
    setFilteredCourses(filtered);
  }, [searchQuery, courseList]);

  return (
    <div>
      <div className="section page-banner-noshapes">
        {/* <img
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
                <Link to="#">Home</Link>
              </li>
              <li className="active">Courses</li>
            </ul>
            <h2 className="title">
              Our <span>Courses</span>
            </h2>
          </div>
        </div>
        <div className="shape-icon-box">
          <img
            className="icon-shape-1 animation-left"
            src={process.env.PUBLIC_URL + "/images/shape/shape-5.png"}
          />
          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge"></i>
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
        <img
          className="shape-author"
          src={process.env.PUBLIC_URL + "/images/author/author-11.jpg"}
        /> */}
      </div>

      <div className="section pb-5" style={{ marginTop: "-10px" }}>
        <div className="container">
          {/* <div className="courses-category-wrapper">
            <div
              className="courses-search search-2"
              style={{ maxwidth: "100% !important" }}
            >
              <input
                type="text"
                placeholder="Search courses"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button aria-label="Search">
                <i className="icofont-search" style={{ height: "59px" }}></i>
              </button>
            </div> */}

          {/*<ul className="category-menu">
                        <li><Link className="active" to="#">All Courses</Link></li>
                        <li><Link to="#">Collections</Link></li>
                        <li><Link to="#">Wishlist</Link></li>
                        <li><Link to="#">Archived</Link></li>
  </ul>*/}
          {/* </div> */}

          <div className="courses-wrapper-02">
            <div className="row">
              {filteredCourses.length === 0 ? (
                <center>
                  <Spinner animation="border" variant="primary" />
                </center>
              ) : (
                filteredCourses.map((course, key) => (
                  <CourseListItems course={course} key={course.id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
