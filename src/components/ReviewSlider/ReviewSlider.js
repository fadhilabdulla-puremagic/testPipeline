import React from 'react'

export function ReviewSlider() {
  return (
    <div className="reviews-wrapper reviews-active">
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {/* Single Reviews Start */}
        <div className="single-review swiper-slide">
          <div className="review-author">
            <div className="author-thumb">
              <img src="/images/author/author-06.jpg" alt="Author" />
              <i className="icofont-quote-left" />
            </div>
            <div className="author-content">
              <h4 className="name">Sara Alexander</h4>
              <span className="designation">Product Designer, USA</span>
              <span className="rating-star">
                <span className="rating-bar" style={{width: '100%'}} />
              </span>
            </div>
          </div>
          <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
        </div>
        {/* Single Reviews End */}
        {/* Single Reviews Start */}
        <div className="single-review swiper-slide">
          <div className="review-author">
            <div className="author-thumb">
              <img src="/images/author/author-07.jpg" alt="Author" />
              <i className="icofont-quote-left" />
            </div>
            <div className="author-content">
              <h4 className="name">Karol Bachman</h4>
              <span className="designation">Product Designer, USA</span>
              <span className="rating-star">
                <span className="rating-bar" style={{width: '100%'}} />
              </span>
            </div>
          </div>
          <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
        </div>
        {/* Single Reviews End */}
        {/* Single Reviews Start */}
        <div className="single-review swiper-slide">
          <div className="review-author">
            <div className="author-thumb">
              <img src="/images/author/author-03.jpg" alt="Author" />
              <i className="icofont-quote-left" />
            </div>
            <div className="author-content">
              <h4 className="name">Gertude Culbertson</h4>
              <span className="designation">Product Designer, USA</span>
              <span className="rating-star">
                <span className="rating-bar" style={{width: '100%'}} />
              </span>
            </div>
          </div>
          <p>Lorem Ipsum has been the industry's standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.</p>
        </div>
        {/* Single Reviews End */}
      </div>
      {/* Add Pagination */}
      <div className="swiper-pagination" />
    </div>
  </div>
  )
}
