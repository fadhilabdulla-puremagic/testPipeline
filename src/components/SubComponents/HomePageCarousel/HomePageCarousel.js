import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { getBannerMarquee } from "../../../context/actions/getBannerMarquee";
import { useState } from "react";
function CarouselFadeExample() {
  const [banners, setBanners] = useState(null);

  const getData = async () => {
    const response = getBannerMarquee();
    response.then((res) => {
      if (
        res.response &&
        res.response.status === 500 &&
        res.code === "ERR_BAD_RESPONSE"
      ) {
      } else if (res.data && res.data.status == "TRUE") {
        setBanners(res.data?.banners);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log("alskas", banners);
  return (
    banners && (
      <div className="mt-2 mb-2">
        <Carousel fade>
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg"
              alt="First slide"
            />
            <div className="carousal-header">
              <p className="">
                <strong>Sale ends today</strong>
              </p>
              <p className="carousal-text">
                Have a dream? Log in by June 22 for special savings and make it
                happen.
              </p>
              <Link className="btn btn-primary btn-hover-dark" to="/contact">
                Buy Course
              </Link>
            </div>
          </Carousel.Item> */}
          {banners.map((el, i) => {
            return (
              <Carousel.Item key={i}>
                <Link to={`${el.button_link ?? '#'}`}>
                  <img
                    className="d-block w-100"
                    src={`${process.env.REACT_APP_IMAGE_URL}uploads/banners/${el.image}`}
                    alt={`${el.title ?? 'Slide'}`}
                  />
                </Link>

                {/* <img
                    className="d-block w-100"
                    src={`${process.env.REACT_APP_IMAGE_URL}uploads/banners/${el.image}`}
                    alt={`${el.title ?? 'Slide'}`}
                  /> */}
                {/* {
                  el?.title ?
                  <div className="carousal-header">
                  <p className="carousel-title">
                    <strong>{el.title}</strong>
                  </p>
                  <p
                    className="carousal-text"
                    dangerouslySetInnerHTML={{
                      __html: el?.text,
                    }}
                  />

                  <Link
                    className="btn btn-primary btn-hover-dark btn-carousal-feature"
                    to={el.button_link}
                  >
                    {el.button_name}
                  </Link>
                  </div>
                  : <></>
                } */}
                
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    )
  );
}

export default CarouselFadeExample;
