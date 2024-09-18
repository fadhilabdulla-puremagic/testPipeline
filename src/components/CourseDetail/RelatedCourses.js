import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";
import { apiGetRelatedCourses } from "../../context/actions/courseActions";
import { Spinner } from "react-bootstrap";
import { useCallback } from "react";
import i18n from "../../i18n/i18n";
const RelatedCourses = React.memo(({ courseId }) => {
  // const { courseDispatch } = useContext(GlobalContext);
  const [courses, setCourses] = useState(null);

  const getCourses = useCallback(async () => {
    const res = await apiGetRelatedCourses(courseId);
    console.log(res)
    if (res && Array.isArray(res)) {
      setCourses(res);
    } else {
      setCourses([]);
    }
  }, [courseId]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const renderCard = ({
    bln_limitted_offer,
    bln_request_quote,
    title,
    price,
    course_type,
    slug,
    id,
    featured_image,
  }) => {
    return (
      <div class="col-12 col-md-12">
        <Link
          key={id}
          to={`/course/${slug ?? id}`}
          class="card mx-0 my-3"
          style={{ maxWidth: "540px" }}
        >
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}uploads/course_items/${featured_image}`}
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "100%" }}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex flex-column justify-content-between h-100">
                <h5
                  class="card-title text-sm font-weight-normal"
                  style={{ fontSize: "1rem" }}
                >
                  {title}
                </h5>
                {bln_limitted_offer === 1 && <span className="bold text-danger" style={{fontSize : '14px'}}>Limited Seats</span>}
                <p class="card-text text-muted" style={{ lineHeight: "0.8", fontSize : '16px' }}>
                  {bln_request_quote === 1? "Request Quote" : course_type === "Free" ? (
                    <small class="">Free</small>
                  ) : (
                    <small class="">{i18n.t('AED')} {price}</small>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <h4 className="mb-0">{i18n.t('CourseDetailsRelatedCourses')}</h4>
      {courses === null ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner />
        </div>
      ) : (
        <div className="row">{courses.map((el, index) => renderCard(el))}</div>
      )}
    </div>
  );
});

export default RelatedCourses;
