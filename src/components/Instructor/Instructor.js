import { React, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { TutorSlider } from "../TutorSlider/TutorSlider";
import { showBanner } from "../../context/actions/showBanner";
import "./instructor.css";
import { InstructorModal } from "../InstructorModal/InstructorModal";
import { metaTags } from "../../context/actions/metaTags";
import i18n from "../../i18n/i18n";

export function Instructor() {
  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);
    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1, 10);
    meta_tags.then((res) => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    });
  }, []);

  const [banners, setBanners] = useState("");
  const navigate = useNavigate();
  // const [showModal, setshowModal] = useState(false);
  const handleShow = () => {
    navigate('/Instructor/register')
    // setshowModal(!showModal);
  };

  useEffect(() => {
    const response = showBanner();
    response.then((data) => setBanners(data));
  }, []);


  return (
    <div>
      {/* {showModal && <InstructorModal handleShow={handleShow} />} */}
      <div className="section slider-section instructor-banner">
        {/* Slider Shape Start */}
        <div className="slider-shape">
          <img
            className="shape-1 animation-round"
            src={process.env.PUBLIC_URL + "/images/shape/shape-8.png"}
          />
        </div>
        {/* Slider Shape End */}

        <div className="container">
          {/* Slider Content Start */}
          <div className="row d-flex justify-content-between">
            <div className="slider-content">
              {/* <h4 className="sub-title">Start your favourite course</h4> */}
              <h2 className="main-title">
                {i18n.t("HeaderTransformYourPassionintoProfession")}
              </h2>
              <p>
                {i18n.t(
                  "HeaderEmpowerThoseAroundYouByPartneringWithUpgradeSkillsToBecomeAnInstructor"
                )}
              </p>
              <div
                className="btn btn-primary btn-hover-dark"
                onClick={handleShow}>
                {i18n.t("HeaderBecomeAnInstructorBtn")}
              </div>
            </div>
            {/* Slider Content End */}
            <div className="slider-images">
              <div className="images">
                {banners && (
                  <img
                    className="instructor-img"
                    src={process.env.PUBLIC_URL + "/images/instructor.webp"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Slider Images End */}
        {/* Slider Video Start */}
        <div className="slider-video">
          <img
            className="shape-1"
            src={process.env.PUBLIC_URL + "/images/shape/shape-9.png"}
          />
          <div className="video-play">
            <img src={process.env.PUBLIC_URL + "/images/shape/shape-10.png"} />
            <Link
              to="https://www.youtube.com/watch?v=BRvyWfuxGuU"
              className="play video-popup">
              <i className="flaticon-play" />
            </Link>
          </div>
        </div>
        {/* Slider Video End */}
      </div>

      <div className="section">
        {/*<div className="section-padding-02 mt-n10">
            <div className="container">
                <div className="row">
                <div className="col-lg-6">
                    <div className="about-images">
                    <div className="images">
                        <img src={process.env.PUBLIC_URL + "/images/about.jpg"  }/>
                    </div>
                    <div className="about-years">
                        <div className="years-icon">
                        <img src={process.env.PUBLIC_URL + "/images/logo-icon.png" } />
                        </div>
                        <p><strong>3+</strong> Years of Knowledge Sharing</p>
                    </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="about-content">
                    <h5 className="sub-title">Welcome to Upgrade Skills.</h5>
                    <h2 className="main-title">Join with us and upgrade your skill for your <span>bright future.</span></h2>
                    <Link to="/courses" className="btn btn-primary btn-hover-dark">Start A Course</Link>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>*/}

        <div className="section-padding-02 mt-n6">
          <div className="container">
            {/* About Items Wrapper Start */}
            <div className="how-it-work-wrapper">
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-1"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-transparency" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t("FlowTeachyourway")}</h3>
                  <p>
                    {i18n.t(
                      "FlowPublishtheCourseyouWantinTheWayyouWantAndAlwaysHaveControlofYourOwnContent"
                    )}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="work-arrow">
                <img
                  className="arrow"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
                />
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-2"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-15.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-forms" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t("FlowInspireLearners")}</h3>
                  <p>
                    {i18n.t(
                      "FlowTeachWhatYouKnowandHelpLearnersExploreTheirInterestsGainNewSkillsAndAdvanceTheirCareers"
                    )}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="work-arrow">
                <img
                  className="arrow"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-17.png"}
                />
              </div>
              {/* Single Work End */}
              {/* Single Work Start */}
              <div className="single-work">
                <img
                  className="shape-3"
                  src={process.env.PUBLIC_URL + "/images/shape/shape-16.png"}
                />
                <div className="work-icon">
                  <i className="flaticon-badge" />
                </div>
                <div className="work-content">
                  <h3 className="title">{i18n.t("FlowGetRewarded")}</h3>
                  <p>
                    {i18n.t(
                      "FlowExpandYourProfessionalNetworkBuildYourExpertiseAndEarnMoneyOnEachPaidEnrollment"
                    )}
                  </p>
                </div>
              </div>
              {/* Single Work End */}
            </div>
            {/* About Items Wrapper End */}
          </div>
        </div>
      </div>

      {/** */}

      {/*<TutorSlider/>*/}

      <div className="section">
        <div className="section-padding-02 mt-n10">
          <div className="container section-teacher-join">
            <div className="container section-teacher-join-a">
              <h3>{i18n.t("Step1")}</h3>
              <h1>{i18n.t("Step1InitialPreparation")}</h1>
              {i18n.t("Step1Description")}
            </div>
            <div className="container section-teacher-join-b">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/initial-preparation.webp"
                }
              />
            </div>
          </div>

          <div className="container section-teacher-join">
            <div className="container section-teacher-join-b">
              <img src={process.env.PUBLIC_URL + "/images/upload-video.webp"} />
            </div>
            <div className="container section-teacher-join-a">
              <h3>{i18n.t("Step2")}</h3>
              <h1>{i18n.t("Step2UploadTheVideo")}</h1>
              {i18n.t("Step2Description")}
            </div>
          </div>

          <div
            className="container section-teacher-join"
            style={{ marginBottom: "30px" }}>
            <div className="container section-teacher-join-a">
              <h3>{i18n.t("Step3")}</h3>
              <h1>{i18n.t("Step3MakeMoneyFromYourCourses")}</h1>
              {i18n.t("Step3Description")}
            </div>

            <div className="container section-teacher-join-b">
              <img
                src={process.env.PUBLIC_URL + "/images/money-transfer.webp"}
              />
            </div>
          </div>
        </div>

        {/* do alone section */}
        <section className="do_alone_section">
          <h1>{i18n.t("OnlineCommunityYouWontHaveToDoItAlone")}</h1>
          <p> {i18n.t("OnlineCommunityOurInstructorSupportTeam")} </p>
          <p> {i18n.t("TeachingCenterHelp")} </p>
        </section>
      </div>

      <div
        className="section section-padding-02"
        style={{ marginBottom: "30px", marginTop: "-20px" }}>
        <div className="container">
          {/* Call to Action Wrapper Start */}
          <div className="call-to-action-wrapper">
            <img
              className="cat-shape-01 animation-round"
              src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"}
            />
            <img
              className="cat-shape-02"
              src={process.env.PUBLIC_URL + "/images/shape/shape-13.svg"}
            />
            <img
              className="cat-shape-03 animation-round"
              src={process.env.PUBLIC_URL + "/images/shape/shape-12.png"}
            />
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* Section Title Start */}
                <div className="section-title shape-02">
                  <h5 className="sub-title">
                    {i18n.t("JoinInstructorBeAnInstructor")}
                  </h5>
                  <h2 className="main-title">
                    {i18n.t("JoinInstructorUpgradeSkillsAsAnInstructor")}
                  </h2>
                </div>
                {/* Section Title End */}
              </div>
              <div className="col-md-6">
                <div className="call-to-action-btn">
                  <div
                    className="btn btn-primary btn-hover-dark"
                    onClick={handleShow}>
                    {i18n.t("JoinInstructorDropInformationBtn")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action Wrapper End */}
        </div>
      </div>
    </div>
  );
}
