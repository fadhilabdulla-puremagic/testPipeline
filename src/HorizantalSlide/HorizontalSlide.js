import React, { useRef } from 'react';
import './slide.css';

const HorizontalSlider = () => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const navItemsRef = useRef(null);

  let scrollPosition = 0;
  const scrollStep = 200;

  const scrollTo = (scrollOffset) => {
    scrollPosition += scrollOffset;
    if (scrollPosition < 0) {
      scrollPosition = 0;
    } else if (scrollPosition > navRef.current.scrollWidth - navRef.current.clientWidth) {
      scrollPosition = navRef.current.scrollWidth - navRef.current.clientWidth;
    }
    navRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const handleNextClick = () => {
    scrollTo(scrollStep);
  };

  const handlePrevClick = () => {
    scrollTo(-scrollStep);
  };

  return (
    <div className="horizontal-slider" ref={containerRef}>
      <div className="nav" ref={navRef}>
        <ul ref={navItemsRef}>
          <li><button className="active" data-bs-toggle="tab" data-bs-target="#tabs1">UI/UX Design</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs2">Development</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs3">Data Science</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs4">Business</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs5">Financial</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs6">Marketing</button></li>
          <li><button data-bs-toggle="tab" data-bs-target="#tabs7">Design</button></li>
        </ul>
      </div>
      <div className="next-btn" tabIndex="0" role="button" aria-label="Next slide" aria-controls="horizontal-slider" aria-disabled="false" onClick={handleNextClick}><i className="icofont-rounded-right" /></div>
      <div className="prev-btn swiper-button-disabled" tabIndex="-1" role="button" aria-label="Previous slide" aria-controls="horizontal-slider" aria-disabled="true" onClick={handlePrevClick}><i className="icofont-rounded-left" /></div>
    </div>
  );
};

export default HorizontalSlider;
