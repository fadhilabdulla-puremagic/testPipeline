import './slider.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Autoplay } from 'swiper';
import { useState, useEffect } from 'react';
import { getTestimonies } from '../../context/actions/getTestimonies';

export const TutorSlider = () => {

  const [testimonials, setTestimonies] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow:true
    };

    useEffect(() => {
      const response = getTestimonies()
      response.then(res => setTestimonies(res))
    },[])

    useEffect(() => {
      
    },[testimonials])

  
    const teachers = [
      {
        name: "John Doe",
        designation: "Mathematics Teacher",
        image: "https://picsum.photos/200",
      },
      {
        name: "Jane Doe",
        designation: "Science Teacher",
        image: "https://picsum.photos/200",
      },
      {
        name: "Bob Smith",
        designation: "English Teacher",
        image: "https://picsum.photos/200",
      }
    ];
  
    return (
      <div className="section " style={{marginBottom: '50px', marginTop:'10px'}}>
        <div className="section-padding-02 mt-n10">
          <div className="container" style={{maxWidth:'1200px'}}>
            <div className="container " >
              <Slider {...settings}>
                {testimonials ? testimonials.map((testimony, index) => (
                  <div key={index}>
                    <div className="card" >
                      <div className="card-body" >
                        {/* <div className="row">
                          <div className="col-md-4" >
                            <div className="round-image">
                              <img src={teacher.image} alt={teacher.name} />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <h5 className="card-title">{teacher.name}</h5>
                            <p className="card-text">{teacher.designation}</p>
                          </div>
                        </div> */}
                        <div className='first-section'  style={{ maxWidth:'550px', margin:'0 auto', display:'flex', padding:'10px', justifyContent:'space-around'}} >
                            <div style={{flex:'1', display:'flex', justifyContent:'flex-start', alignItems:'flex-start'}}>
                                <div >
                                    <img src={process.env.REACT_APP_IMAGE_URL+"/uploads/testimonials/"+testimony.image} style={{height:'10rem', width:'10rem'}}/>
                                </div>
                            </div>
                            <div style={{flex:'1', display:'flex', alignItems:'flex-start', flexDirection:'column', justifyContent:'flex-start'}}>
                                <p style={{textAlign:'justify'}}>
                                   {testimony.quotes}
                                </p>
                                <p style={{textAlign:'justify', fontWeight:'bold'}}>{testimony.person_name}</p>
                                <p style={{textAlign:'justify' , fontWeight:'bold'}}>{testimony.designation}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )): <h1>Network Error ....</h1>}
              </Slider>
            </div> 
          </div> 
        </div>
      </div>
    );
  };
  