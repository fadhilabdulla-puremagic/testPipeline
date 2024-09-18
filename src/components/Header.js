import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GlobalContext } from "../context/GlobalState";
import {
  addUserWithJwt,
  removeUserWithJwt,
} from "../context/actions/userActions/userActions";
import jquery from "jquery";
import { CartIcon } from "./CartIcon/CartIcon";
import { UserProfile } from "./Profile/UserProfile";
import { showLinks } from "../context/actions/showLinks";
import "./header.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CourseCategories from "./CourseCategories/CourseCategories";
import LanguageDropdown from "./LanguageDropdown";
import i18n from "../i18n/i18n";

export default function Header() {
  const navigate = useNavigate();
  const [links, setLinks] = useState("");

  useEffect(() => {
    const response = showLinks();

    response.then((result) => {
      setLinks(result);
      //console.log(result)
    });
  }, []);

  const [myJwtCookie, setMyJwtCookie, removeCookie] = useCookies(["jwt"]);

  const [cart, setCart] = useState([]);
  const { userState, userDispatch, singleCartState, singlecartDispatch } =
    useContext(GlobalContext);

  useEffect(() => {
    singlecartDispatch({ type: "LOAD_CART_ITEMS" });
  }, []);

  // useEffect(() => {
  //     const items = JSON.parse(localStorage.getItem('cart')) || []
  //     setCart(items)
  // }, [])

  const user = userState.user;
  const menuToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuRefSlider = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (myJwtCookie.jwt) {
      // console.log(myJwtCookie)
      addUserWithJwt(myJwtCookie.jwt, userDispatch);
    }
  }, [myJwtCookie.jwt]);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwtemail"));

    if (jwt) {
      addUserWithJwt(jwt, userDispatch);
    }
  }, [localStorage.getItem("jwtemail")]);

  useEffect(() => {
    setCart(singleCartState.cart);
  }, [singleCartState]);

  useEffect(() => {
    const $ = jquery;
    const menuToggle = $(menuToggleRef.current);
    const mobileMenu = $(mobileMenuRef.current);
    const overlay = $(overlayRef.current);
    const mobileMenuSlider = $(mobileMenuRefSlider.current);

    menuToggle.on("click", function () {
      mobileMenuSlider.addClass("open");
      overlay.addClass("open");
    });

    mobileMenu.on("click", function () {
      mobileMenuSlider.removeClass("open");
      overlay.removeClass("open");
    });

    overlay.on("click", function () {
      mobileMenuSlider.removeClass("open");
      overlay.removeClass("open");
    });
  }, []);

  const closeMenu = () => {
    mobileMenuRefSlider?.current.removeClass("open");
    overlayRef?.current.removeClass("open");
  };

  const handleLogout = () => {
    removeCookie("jwt");
    removeUserWithJwt(userDispatch);
    localStorage.setItem("jwtemail", JSON.stringify([]));
    navigate("/");
    return false; // prevent any further code from executing
  };
  return (
    <div>
      <div className="header-section">
        <div className="header-main">
          <div className="container">
            <div className="header-main-wrapper">
              <div className="header-logo">
                <Link to="/">
                  <img
                    alt="Upgrade Skills Logo"
                    src={
                      process.env.PUBLIC_URL + "/images/upgrade-skills-logo.png"
                    }
                    style={{ height: "6rem" }}
                  />
                </Link>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="header-menu d-none d-lg-block">
                  <ul className="nav-menu">
                    <ul>
                      {/* <li>
                        <NavLink
                          exact={true.toString()}
                          to="/courses"
                          activeclassname="active"
                        >
                          Courses
                        </NavLink>
                      </li> */}
                      <li>
                      <a>{i18n.t('HeaderCategories')} </a>
                        <CourseCategories view="headerMenu" />
                      </li>
                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/instructor"
                          activeclassname="active"
                        >
                          {i18n.t("HeaderBeAnInstructor")}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/special-offers"
                          activeclassname="active"
                        >
                          {i18n.t('HeaderSpecialOffers')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/upcoming-events"
                          activeclassname="active"
                        >
                          {i18n.t('HeaderUpcomingEvents')}
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink
                          exact={true.toString()}
                          to="/blog"
                          activeclassname="active"
                        >
                          Blogs
                        </NavLink>
                      </li> */}
                    </ul>
                  </ul>
                </div>

                <div className="header-sign-in-up d-none d-lg-block ml-2">
                  <ul>
                    <li>
                      <Link to="/search">
                        <i
                          className="flaticon-magnifying-glass"
                          style={{ fontSize: "x-large" }}
                        ></i>
                      </Link>
                    </li>
                    {user && <UserProfile user={user} />}
                    {cart && (
                      <Link to="/cart">
                        <CartIcon numberOfCourses={cart.length} />
                      </Link>
                    )}
                    {/* {!cart && <CartIcon numberOfCourses={0}/> } */}
                    {!user && (
                      <li>
                        <Link className="sign-up" to="/login">
                          {i18n.t('HeaderLogin')}
                        </Link>
                      </li>
                    )}
                    {/*!user && <li><Link className="sign-up" to="/register">Sign up</Link></li> */}
                    {user && (
                      <li>
                        <Link
                          className="sign-up"
                          onClick={() => handleLogout()}
                        >
                          {i18n.t('HeaderLogout')}
                        </Link>
                      </li>
                    )}
                    <LanguageDropdown />
                  </ul>
                </div>
              </div>

              <div className="header-toggle d-lg-none">
                <Link ref={menuToggleRef} className="menu-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Header Section End */}

      <div className="mobile-menu" ref={mobileMenuRefSlider}>
        <div className="header-logo">
          <Link to="/" onClick={closeMenu}>
            <img
              src={process.env.PUBLIC_URL + "/images/upgrade-skills-logo.png"}
              style={{ height: "4rem" }}
              alt="Upgrade Skills Logo"
            />
          </Link>
        </div>

        <Link className="menu-close" ref={mobileMenuRef}>
          <i className="icofont-close-line"></i>
        </Link>

        <div className="mobile-top">
          {links && (
            <p dir="ltr">
              <i className="flaticon-phone-call"></i>{" "}
              <Link>{links.mobile}</Link>
            </p>
          )}
          {links && (
            <p dir="ltr">
              <i className="flaticon-email"></i> <Link>{links.email}</Link>
            </p>
          )}
        </div>

        <div className="mobile-sign-in-up">
          <ul>
            {!user && (
              <li>
                <Link className="sign-in" to="/login" onClick={closeMenu}>
                  {i18n.t('HeaderLogin')}
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link className="sign-up" to="/register" onClick={closeMenu}>
                  {i18n.t('RegisterPageRegister')}
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link className="sign-up" onClick={() => handleLogout()}>
                  {i18n.t('HeaderLogout')}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="mobile-menu-items">
          <ul className="nav-menu" dir="ltr">
          <li className="flex justify-content-between">
              <Link to="/search" onClick={closeMenu}>
              Search <i
                          className="flaticon-magnifying-glass ms-1"
                          style={{ fontSize: "x-small" }}
                        ></i> 
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMenu}>
                {i18n.t('FooterHome')}
              </Link>
            </li>
            <li>
              <Link to="/courses" onClick={closeMenu}>
                {i18n.t('FooterAllCourses')}
              </Link>
            </li>

            <CourseCategories view={"MobileMenu"} closeMenu={closeMenu} />

            <li>
              <Link to="/category/upcoming-events" onClick={closeMenu}>
                {i18n.t('HeaderUpcomingEvents')}
              </Link>
            </li>

            <li>
              <Link to="/about" onClick={closeMenu}>
                {i18n.t('HeaderAbout')}
              </Link>
            </li>
            <li>
              <Link to="/instructor" onClick={closeMenu}>
                {i18n.t('HeaderBeAnInstructor')}
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>
                {i18n.t('FooterContactUs')}
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeMenu}>
                {i18n.t('FooterBlogs')}
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeMenu}>
                {cart && (
                  <div className="d-flex justify-content-center">
                    <i
                      className="fas fa-shopping-cart"
                      style={{ fontSize: "22px" }}
                    ></i>
                    <span
                      className="badge"
                      style={{
                        background: "red",
                        position: "relative",
                        top: "-20px",
                        left: "0px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </div>
                )}
              </Link>
            </li>
            <li className={user ? "" : "d-none"}>
              {" "}
              <Link to="/profile" onClick={closeMenu}>
                {user && <h6>{user?.firstname?.substr(0, 20)} </h6>}
              </Link>{" "}
            </li>
            <li>
              <LanguageDropdown />
            </li>
          </ul>
        </div>


        <div className="mobile-social">
          <ul className="social" dir="ltr">
            {links && (
              <li>
                <Link to={links.facebook}>
                  <i className="flaticon-facebook"></i>
                </Link>
              </li>
            )}
            {/* <li><Link to="{#}"><i className="flaticon-twitter"></i></Link></li>
                        <li><Link to="{#}"><i className="flaticon-skype"></i></Link></li> */}
            {links && (
              <li>
                <Link to={links.instagram}>
                  <i className="flaticon-instagram"></i>
                </Link>
              </li>
            )}
            {links && (
              <li>
                <Link to={links.linked_in}>
                  <i className="flaticon-linkedin"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/**Mobile Navigation Section End */}

      <div className="overlay" ref={overlayRef}></div>
      {/**Overlay Section End */}
    </div>
  );
}
