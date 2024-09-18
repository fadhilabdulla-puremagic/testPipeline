import React from "react";
import HotDeals from "./HotDeals";
import FeaturedDeals from "./FeaturedDeals";
import SectionCourses from "./SectionCourses";

function SingleSection({ section }) {
  // console.log(section);
  return (
    <>
      <div className="section pt-5">
        <div className="container">
          <h3 className="pb-2">{section?.title}</h3>
          <HotDeals deals={section?.hot_deals} />
        </div>
      </div>

      <div className="section">
        <div className="container">
          

          <FeaturedDeals deals={section?.featured_deals} />

       </div>
      </div>

      <div className="section">
        <div className="container">
          <SectionCourses deals={section.categorical_deals} />
        </div>
      </div>
    </>
  );
}

export default SingleSection;
