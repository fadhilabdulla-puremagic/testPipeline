import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourseCategories } from "../../context/actions/showCategories";
import Accordion from "react-bootstrap/Accordion";
import i18n from "../../i18n/i18n";

function CourseCategories({ view = "headerMenu", closeMenu }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length === 0) {
      const response = getCourseCategories();
      response.then((res) => {
        if (res.categories) {
          setCategories([...res.categories]);
        }
      });
    }
  }, []);

  const renderCompnent = () => {
    switch (view) {
      case "headerMenu":
        return (
          <ul className="sub-menu">
            {categories.map((el, i) => (
              <li key={i}>
                <Link to={`category/${el?.slug ?? el?.id}`}>{el.title}</Link>
              </li>
            ))}
          </ul>
        );

      case "MobileMenu":
        return (
          <Accordion style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span style={{ fontWeight: "500", color: "black" }}>
                  {i18n.t('HeaderCategories')}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  {categories.map((el, i) => (
                    <li key={i}>
                      <Link
                        onClick={closeMenu}
                        to={`category/${el?.slug ?? el?.id}`}
                      >
                        {el.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      default:
        break;
    }
  };

  return renderCompnent();
}

export default CourseCategories;
