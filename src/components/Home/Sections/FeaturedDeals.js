import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import './index.css';
import bestSellerTag from '../../../images/best-seller-tag.svg'
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { Link } from 'react-router-dom'


function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

function FeaturedDeals({deals = []}) {
  const { height, width } = useWindowDimensions();
    const slidesPerView = width < 960 ? 1: 2;
  return (
    <>
        {
            deals.map((el,i)=>
                <div key={i} style={{padding:'15px 30px', backgroundColor:'#e7f8ee', borderRadius:'10px', position:'relative'}}>
                     <h3>{el?.title}</h3>
                     <p className='my-0'>{el?.description}</p>
                    
                     <Carousel>
                        
                        {[...chunks(el?.deals || [], slidesPerView)].map((arr, i) => {
                            return (
                                <Carousel.Item key={i}>
                                    <div className="h-100 justify-content-around align-items-center hstack gap-3">
                                        {
                                            arr.map((el, index) => 
                                            
                                                <Link key={index} className="card flex-row" style={{ width: "35rem",padding:'0.5rem' }}  to={el.href}>
                    
                                                    {
                                                        el?.best_seller === 1 &&
                                                        <img src={bestSellerTag} alt="Best Seller" className="bestSellerTag" />
                                                    }
                                                    <img  src={`${process.env.REACT_APP_IMAGE_URL}uploads/sections/${el.image}`} alt={el.title} className="card-img-top img-responsive" style={{width:'30%', objectFit:'cover', height:'8rem'}}/>
                                                    <div className="card-body d-flex flex-column justify-content-between p-0 px-3">
                                                        <h4 className="card-title h5 h4-sm">{el.title}</h4>
                                                        <div>
                                                            {
                                                                el?.prev_price > 0 &&
                                                                <del style={{fontSize:'1rem'}}> AED {el.prev_price}</del>
                                                            }
                                                            {
                                                                el?.price ?
                                                                <span style={{fontSize:'1.5rem', fontWeight:'x-large'}}> AED {el.price}</span>
                                                                :
                                                                <span style={{fontSize:'1.5rem', fontWeight:'x-large'}}> FREE </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        }
                                       
                                    </div>
                                </Carousel.Item>
                            );
                        })}
                     </Carousel>
                </div>
            )
        }
        
    </>
  )
}

export default FeaturedDeals