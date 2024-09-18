import { Swiper } from 'swiper/react';
import { useEffect } from 'react';

const CoursesTabsMenu = () => {
    useEffect(() => {
    const swiper = new Swiper('.courses-tabs-menu .swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    navigation: {
    nextEl: '.courses-tabs-menu .swiper-button-next',
    prevEl: '.courses-tabs-menu .swiper-button-prev',
    },
    });
    }, []);
    
    return (
    <div className="courses-tabs-menu courses-active">
    <div className="swiper-container">
    <ul className="swiper-wrapper nav">
    <li className="swiper-slide">
    <button className="active" data-bs-toggle="tab" data-bs-target="#tabs1">UI/UX Design</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs2">Development</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs3">Data Science</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs4">Business</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs5">Financial</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs6">Marketing</button>
    </li>
    <li className="swiper-slide">
    <button data-bs-toggle="tab" data-bs-target="#tabs7">Design</button>
    </li>
    </ul>
    </div>
    <div className="swiper-button-next"><i className="icofont-rounded-right"></i></div>
    <div className="swiper-button-prev"><i className="icofont-rounded-left"></i></div>
    </div>
    );
    };
    
    
    
    export default CoursesTabsMenu;