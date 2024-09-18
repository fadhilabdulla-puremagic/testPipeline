import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorRegister.css";
import { getCourseCategories } from "../../context/actions/showCategories";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { sendInstructorDetails } from "../../context/actions/sendInstructorDetails";

export function InstructorRegister() {
  const [NavigatorIndex, setNavigatorIndex] = useState(1);
  const NavigatorFunction = (operation) => {
    if (operation == "tosecond") {
      setNavigatorIndex(2);
    }
    if (operation == "tothird") {
      setNavigatorIndex(3);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? e.target.innerText,
    });
  };
  const handleButtonDataChange = (propName, porpValue, navigateTo) => {
    setFormData({
      ...formData,
      [propName]: porpValue ?? "",
    });
    NavigatorFunction(navigateTo);
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    courseName: "",
    newCourseCategory : null,
    courseCategory: "",
    haveRecordedVedio: null,
    needAssisstanceForUploadingVedio: null,
    instructorProfile: "",
    instructorProfileImage : null,
    numberOfVideos : null,
    introVideo : null,
    courseThumbnail: null
  });
  useEffect(() => {
    if (categories.length === 0) {
      const response = getCourseCategories();
      response.then((res) => {
        if (res.categories) {
          setCategories([...res.categories]);
        }
      });
    }
  }, []);
  const handleSubmit = async () => {
    setLoading(true)
    const res = await sendInstructorDetails(formData);
    if (window?.dataLayer) {
      window.dataLayer.push({
        event: "instructorInfoForm",
        time: new Date(),
      });
    }
    setLoading(false)
    if (res["status"]== 200){navigate('/')}
  };

  return (
    
    <div>
      {loading && <LoadingSpinner />}
      <div class="mt-10 page-content-wrapper py-0 bg-mainheaderbackgournd">
        <div class="admin-tab-menu ">
          <a
            className={`${NavigatorIndex >= 1 && "active"}`}
            onClick={() => NavigatorIndex > 1 && setNavigatorIndex(1)}>
            Step 1
          </a>
          <a
            className={`${NavigatorIndex >= 2 && "active"}`}
            onClick={() => NavigatorIndex > 2 && setNavigatorIndex(2)}>
            Step 2
          </a>
          <a className={`${NavigatorIndex == 3 && "active"}`}>Step 3</a>
        </div>
        <div class="main-content-wrapper mt-0">
          <div class="container-fluid">
            <div class="">
              <div class="single-courses-rating">
                {NavigatorIndex == 1 ? (
                  <>
                    <h2>Become a Upgrade skills Instructor</h2>
                    <p>
                      Uncover a welcoming online instructors' network and enjoy
                      instant access to an array of valuable course creation
                      tools and resources.
                    </p>
                    <div className="row">
                      <div className="col-6">
                        <input
                          name="fullname"
                          required=""
                          type="text"
                          value={formData.fullname}
                          placeholder="Full Name"
                          onChange={handleChange}></input>
                      </div>
                      <div className="col-6">
                        <input
                          name="email"
                          required=""
                          type="email"
                          value={formData.email}
                          placeholder="Email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          name="phone"
                          required=""
                          type="tel"
                          value={formData.phone}
                          placeholder="Phone"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <select name="courseCategory" onChange={handleChange}>
                          <option value={""}>Choose a category</option>
                          {categories.map((el, i) => (
                            <option value={el.title}>{el.title}</option>
                          ))}
                          <option value="other">Others</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <input
                          name="courseName"
                          required=""
                          type="text"
                          value={formData.courseName}
                          placeholder="Course Name"
                          onChange={handleChange}
                        />
                      </div>
                      { formData.courseCategory.includes("other") && <div className="col-6">
                        <input
                          name="newCourseCategory"
                          required=""
                          type="tel"
                          value={formData.newCourseCategory}
                          placeholder="New Course Category Name"
                          onChange={handleChange}
                        />
                      </div>}
                    </div>
                    <hr />
                    <div class="courses pb-8 custom-transition">
                      <div class="courses-content">
                        <h4 class="title mb-3">
                          <a>Do you have recorded vedio ?</a>
                        </h4>
                        <a
                          href="#"
                          class="instructor-btn-error mr-1"
                          onClick={() =>
                            handleButtonDataChange(
                              "haveRecordedVedio",
                              false,
                              "tothird"
                            )
                          }>
                          No, I don't.
                        </a>
                        <a
                          href="#"
                          class="instructor-btn-success"
                          onClick={() =>
                            handleButtonDataChange(
                              "haveRecordedVedio",
                              true,
                              "tosecond"
                            )
                          }>
                          Yes, I Have.
                        </a>
                      </div>
                    </div>
                  </>
                ) : NavigatorIndex == 2 ? (
                  <>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/XuVuoJDK_E8?si=92SaJDFdkm2RkQnl"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"></iframe>

                    <div class="courses pb-8 custom-transition">
                      <div class="courses-content">
                        <h4 class="title mb-3">
                          <a>Need support to upload video ?</a>
                        </h4>
                        <a
                          href="#"
                          class="instructor-btn-error mr-1"
                          onClick={() =>
                            handleButtonDataChange(
                              "needAssisstanceForUploadingVedio",
                              true,
                              "tothird"
                            )
                          }>
                          Yes, I need.
                        </a>
                        <a
                          href="#"
                          class="instructor-btn-success"
                          onClick={() =>
                            handleButtonDataChange(
                              "needAssisstanceForUploadingVedio",
                              false,
                              "tothird"
                            )
                          }>
                          No, I can upload Myself.
                        </a>
                      </div>
                    </div>
                  </>
                ) : NavigatorIndex == 3 ? (
                  <>
                    <div className="row">
                      <div className="col-6">
                        <input
                          name="courseDescription"
                          required=""
                          type="tel"
                          placeholder="Course Description"
                          value={formData.courseDescription}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          name="contentOverview"
                          required=""
                          type="tel"
                          placeholder="Content Overview"
                          value={formData.contentOverview}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          name="instructorProfile"
                          required=""
                          type="tel"
                          placeholder="Instructor Profile"
                          value={formData.instructorProfile}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          name="language"
                          required=""
                          type="tel"
                          placeholder="Language"
                          value={formData.language}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <div class="file-upload-wrapper">
                          <input
                            type="file"
                            name="instructorProfileImage"
                            class="file-upload-input"
                            // value={formData.instructorProfileImage}
                          onChange={handleChange}
                          />
                          <label  class="file-upload-label">
                            <span class="file-upload-placeholder">
                              {!formData.instructorProfileImage ? "Upload " : "Uploaded " }Profile Image
                            </span>
                            <span class="file-upload-icon">{!formData.instructorProfileImage ? <i className="fas fa-camera"></i> : <i className="fas fa-check-circle" style={{color : "green"}}></i> }</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <input
                          name="numberOfVideos"
                          required=""
                          type="number"
                          placeholder="Number of vedios"
                          value={formData.numberOfVideos}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="col-6">
                        <div class="file-upload-wrapper">
                          <input
                            type="file"
                            name="courseThumbnail"
                            class="file-upload-input"
                            // value={formData.courseThumbnail}
                          onChange={handleChange}
                          />
                          <label  class="file-upload-label">
                            <span class="file-upload-placeholder">
                              {!formData.courseThumbnail ? "Upload " : "Uploaded " }Course Thumbnail
                            </span>
                            <span class="file-upload-icon">{!formData.courseThumbnail ? <i className="fas fa-file"></i> : <i className="fas fa-check-circle" style={{color : "green"}}></i> }</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="file-upload-wrapper">
                          <input
                            type="file"
                            name="introVideo"
                            class="file-upload-input"
                            // value={formData.introVideo}
                          onChange={handleChange}
                          />
                          <label  class="file-upload-label">
                            <span class="file-upload-placeholder">
                              {!formData.introVideo ? "Upload " : "Uploaded " }Intro Video
                            </span>
                            <span class="file-upload-icon">{!formData.introVideo ? <i className="fas fa-user"></i> : <i className="fas fa-check-circle" style={{color : "green"}}></i> }</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="item-center mt-4">
                      <a
                        href="#"
                        class="instructor-btn-success-width"
                        onClick={handleSubmit}>
                        Submit
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
