import React from 'react'
import { Link } from 'react-router-dom'
const colorsArr = ['#7ba591', '#cc222b', '#faa41b', '#f154bc', '#ffd45b', '#537c78', '#f154bc', '#ffd45b', '#7ba591', '#cc222b'];


function HotDeals({deals=[]}) {
  return (
    <>
        <div className='row'>
            {deals.map((el,i)=>
                <Link to={el.href} key={i} className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch">
                    <div className="card m-1 w-100 card-deals">
                        <img src={`${process.env.REACT_APP_IMAGE_URL}uploads/sections/${el.image}`} alt={el.title} className="card-img-top img-responsive" style={{width:'100%', objectFit:'fill', height:'15rem'}} />
                        <div className="card-body d-flex flex-column text-center px-5 justify-content-between" style={{backgroundColor: ` ${ colorsArr[Math.floor( 0 + Math.random() * (colorsArr.length - 0))]}`}}>
                            <h5 className="card-title text-white">{el.title}</h5>
                            {
                                el?.price ?
                                <span style={{fontSize:'1.5rem', fontWeight:'x-large', color:'azure'}}> AED {el.price}</span>
                                :
                                <span style={{fontSize:'1.5rem', fontWeight:'x-large', color:'azure'}}> FREE </span>
                            }
                        </div>
                    </div>
               </Link>
            )}
            
        </div>
    </>
  )
}

export default HotDeals