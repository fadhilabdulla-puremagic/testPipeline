import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { showLinks } from "../../context/actions/showLinks";
import { toast } from "react-toastify";
import { SendSubscription } from "../../context/actions/sendSubscription";
// import { showCategories } from "../../context/actions/showCategories";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import i18n from "../../i18n/i18n";

export default function Footer() {
  const [links, setLinks] = useState("");
  const [email, setEmail] = useState("");
  // const [categories, setCategories] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const response = showLinks();
    response.then((result) => setLinks(result));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error("Please enter a valid email", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    setShowSpinner(true);

    const response = SendSubscription(email);
    response.then((res) => {
      if (res == "success") {
        setShowSpinner(false);
        toast.success("Thank you for subscribing !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(res);
        return;
      } else {
        setShowSpinner(false);
        toast.success("Thank you for subscribing !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log(res);
      }
    });

    setEmail("");
  };

  return (
    <div className="mt-auto">
      {showSpinner && <LoadingSpinner />}
      <div className="section footer-section">
        {/* Footer Widget Section Start */}
        <div className="footer-widget-section">
          <img
            className="shape-1 animation-down"
            src={process.env.PUBLIC_URL + "/images/shape/shape-21.png"}
            alt="Shape"
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 order-md-1 order-lg-1">
                {/* Footer Widget Start */}
                <div className="footer-widget">
                  <div className="widget-logo">
                    <Link to="/" aria-label="Upgrade Skills">
                      <img
                        alt="Upgrade Skills Logo"
                        src={
                          process.env.PUBLIC_URL +
                          "/images/upgrade-skills-logo.png"
                        }
                        style={{ height: "4rem" }}
                      />
                    </Link>
                  </div>
                  <div className="widget-address">
                    <h4 className="footer-widget-title">{i18n.t('FooterLocation')}</h4>
                    <p>{links?.address}</p>
                  </div>
                  <ul className="widget-info">
                    <li>
                      <p>
                        {" "}
                        <i className="flaticon-email" />{" "}
                        {links && (
                          <Link
                            to={`mailto:${links?.email}`}
                            aria-label="Email: Upgrade Skills"
                          >
                            {links?.email}
                          </Link>
                        )}{" "}
                      </p>
                    </li>
                    <li>
                      <p>
                        {" "}
                        <i className="flaticon-phone-call" />{" "}
                        {links && (
                          <Link
                            to={`tel:${links.mobile}`}
                            aria-label="Contact Number: Upgrade Skills"
                            dir="ltr"
                          >
                            {links?.mobile}
                          </Link>
                        )}{" "}
                      </p>
                    </li>
                  </ul>
                  <ul className="widget-social">
                    <li>
                      {links && (
                        <Link
                          target="_blank"
                          to={links?.facebook}
                          aria-label="Facebook: Upgrade Skills"
                        >
                          <i className="flaticon-facebook" />
                        </Link>
                      )}
                    </li>
                    {/* <li><Link to="#"><i className="flaticon-twitter" /></Link></li> */}
                    {/* <li><Link to="#"><i className="flaticon-skype" /></Link></li> */}
                    <li>
                      {links && (
                        <Link
                          target="_blank"
                          to={links?.instagram}
                          aria-label="Instagram: Upgrade Skills"
                        >
                          <i className="flaticon-instagram" />
                        </Link>
                      )}
                    </li>
                    {links && (
                      <li>
                        <Link
                          target="_blank"
                          to={links?.linked_in}
                          aria-label="LinkedIn: Upgrade Skills"
                        >
                          <i className="flaticon-linkedin"></i>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                {/* Footer Widget End */}
              </div>
              <div className="col-lg-6 order-md-3 order-lg-2">
                {/* Footer Widget Link Start */}
                <div className="footer-widget-link">
                  {/* Footer Widget Start */}
                  <div className="footer-widget">
                    <h4 className="footer-widget-title">{i18n.t('FooterGeneralLinks')}</h4>
                    <ul className="widget-link">
                      <li>
                        <Link to="/">{i18n.t('FooterHome')}</Link>
                      </li>
                      <li>
                        <Link to="/courses">{i18n.t('FooterAllCourses')}</Link>
                      </li>
                      <li>
                        <Link to="/instructor">{i18n.t('FooterBeAnInstructor')}</Link>
                      </li>
                      <li>
                        <Link to="/about">{i18n.t('FooterAbout')}</Link>
                      </li>

                      <li>
                        <Link to="/contact">{i18n.t('FooterContactUs')}</Link>
                      </li>
                      <li>
                        <Link to="/blog">{i18n.t('FooterBlogs')}</Link>
                      </li>
                      {/*} {categories && categories.slice(0,5).map((category, index) => {
                        return <li key={index}><Link to="#">{category}</Link></li>
                      })}*/}
                    </ul>
                  </div>
                  {/* Footer Widget End */}
                  {/* Footer Widget Start */}
                  <div className="footer-widget">
                    {/*<h4 className="footer-widget-title">Quick Links</h4>
                    <ul className="widget-link">
                      <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                      <li><Link to="/about/us">About US</Link></li>
                      <li><Link to="/contact">Contact US</Link></li>
                    </ul>*/}
                    <h4 className="footer-widget-title">{i18n.t('FooterLocation')}</h4>
                    <br />
                    <div
                      className="footer-map section "
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5459104659285!2d55.358310914963575!3d25.28585648385499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c61925f56a7%3A0x7d8677d3d322c4ce!2sPure%20Magic%20Exhibition%20And%20Conference%20Organizing!5e0!3m2!1sen!2sae!4v1679638223677!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                  {/* Footer Widget End */}
                </div>
                {/* Footer Widget Link End */}
              </div>
              <div className="col-lg-3 col-md-6 order-md-2 order-lg-3">
                {/* Footer Widget Start */}
                <div className="footer-widget">
                  <h4 className="footer-widget-title">{i18n.t('FooterSubscribe')}</h4>
                  <div className="widget-subscribe">
                    <p>
                      {i18n.t('FooterStayUptodate')}
                    </p>
                    <div className="widget-form">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="email"
                          placeholder={i18n.t('FooterEmailHere')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary btn-hover-dark">
                          {i18n.t('FooterSubscribeNow')}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Footer Widget End */}
              </div>
            </div>
          </div>
          <img
            className="shape-2 animation-left"
            src={process.env.PUBLIC_URL + "/images/shape/shape-22.png"}
            alt="Shape"
          />
        </div>
        {/* Footer Widget Section End */}
        {/* Footer Copyright Start */}
        <div className="footer-copyright">
          <div className="container">
            {/* Footer Copyright Start */}
            <div className="copyright-wrapper">
              <div className="copyright-link">
                <Link to={"/terms-and-conditions"}>Terms and Conditions</Link>
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
                {/*<Link to="#">Sitemap</Link>
                <Link to="#">Security</Link>*/}
              </div>
              <div className="copyright-text">
                <p>
                  © {new Date().getFullYear()} <span> Upgrade Skills. </span>{" "}
                  All Rights Reserved | Developed by Pure Magic Information Technology Services.
                </p>
              </div>
            </div>
            {/* Footer Copyright End */}
          </div>
        </div>
        {/* Footer Copyright End */}
      </div>
      <a
        href="https://api.whatsapp.com/send/?phone=971524039578&text=Hello%2C%20I%20just%20visited%20UpgradeSkills%20and%20I%27m%20looking%20for%20some%20help%2E"
        rel="noreferrer"
        className="whatsapp-float"
        target="_blank"
      >
        <img src="/images/icon/whatsapp.png" alt="whatsapp contact" />
      </a>
    </div>
  );
}
