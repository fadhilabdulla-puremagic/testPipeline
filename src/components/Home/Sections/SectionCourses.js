import React from "react";
import { Link } from 'react-router-dom'


function SectionCourses({ deals = [] }) {
  return (
    <>
      {deals.map((deal, i) => (
          <div
            key={i}
            className="mt-5"
            style={{
              padding: "10px 30px",
              backgroundColor: "#e7f8ee",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <h3 className="mt-3">{deal.name}</h3>
            <div className="row">
              {deal?.course_list.map((el, i) => (
                <Link
                  to={`/course/${el?.slug ?? el?.id}`}
                  key={i}
                  className="col-lg-4 d-flex align-items-stretch"
                >
                  <div className="card w-100 rounded">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}uploads/course_items/${el.featuredImage}`}
                      alt={el.title}
                      className="card-img-top img-responsive"
                      style={{
                        width: "100%",
                        objectFit: 'contain',
                        height: "20rem",
                      }}
                    />
                    <div className="card-body d-flex flex-column text-center px-5 justify-content-between">
                      <h5 className="card-title">{el.title}</h5>
                      {el?.price ? (
                        <span
                          style={{ fontSize: "1.7rem", fontWeight: "x-large" }}
                        >
                          AED {el.price}
                        </span>
                      ) : (
                        <span
                          style={{ fontSize: "1.7rem", fontWeight: "x-large" }}
                        >
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

      ))}
    </>
  );
}

export default SectionCourses;
