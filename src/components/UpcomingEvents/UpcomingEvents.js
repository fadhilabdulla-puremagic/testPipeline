/* eslint-disable jsx-a11y/alt-text */
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { listCourses } from "../../context/actions/courseActions";
import { Spinner } from "react-bootstrap";
import { metaTags } from "../../context/actions/metaTags";
import { apiGetUpcomingEvents } from "../../context/actions/courseActions";
import i18n from "../../i18n/i18n";
import CourseListItems from "../CourseListItem/CourseListItem";


function Search() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [CourseList, setCourseList] = useState(null);

  const getCourseList = async () => {
    setIsLoading(true);
    const res = await apiGetUpcomingEvents();
    console.log(res);
    setIsLoading(false);
    if (res && res.length > 0) {
      setCourseList(res ?? []);
    } else {
      setCourseList([]);
    }
  };

  // useEffect(() => {
  //   listCourses(courseDispatch);
  // }, [courseDispatch]);

  useEffect(() => {
    getCourseList();
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

  // const handleClick = (course) => {
  //   navigate(`/course/${course.slug ?? course.id}`);
  // };

  return (
    <div>
      <div className="section page-banner" style={{ height: "20rem" }} dir="ltr">
        <img
          className="shape-1 animation-round"
          src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
        />
        {/* <img
          className="shape-2"
          src={process.env.PUBLIC_URL + "/images/shape/shape-23.png"}
        /> */}
        <div className="container">
          <div className="page-banner-content">
            <ul className="breadcrumb">
              <li>
                <Link to="#">Home</Link>
              </li>
              <li className="active">Events</li>
            </ul>
            <h2 className="title">
            {i18n.t('UpcomingEventsUpcoming')} <span>{i18n.t('UpcomingEventsEvents')}</span>
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
        />
      </div>

      <div className="section pb-5" style={{ marginTop: "-10px" }}>
        <div className="container">
          <div>
            <div className="row">
              {isLoading ? (
                <center>
                  <Spinner animation="border" variant="primary" />
                </center>
              ) : CourseList.length === 0 ? (
                <p className="pt-2 mt-4">{i18n.t('CategoryNoCourseFound')}</p>
              ) : (
                CourseList.map((course, key) => (
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

export default Search;
