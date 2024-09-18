
/* eslint-disable jsx-a11y/alt-text */
import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Spinner } from "react-bootstrap";
// import { metaTags } from "../../context/actions/metaTags";
import { apiGetWebinar } from "../../context/actions/webinarActions";

function Search() {
  // const navigate = useNavigate();

  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [webinar, setWebinar] = useState(null);
  const [error, setError] = useState(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getWebinar = async () => {
    if (!id) {
      setError("Invalid invitation link.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const webinarRes = await apiGetWebinar({ slug: id });
    setIsLoading(false);

    if (webinarRes && webinarRes?.success === true) {
      setWebinar(webinarRes.data[0]);
    } else if (webinarRes?.message) {
      setError(webinarRes.message);
    } else {
      setError("We were unable to get webinar details.");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    getWebinar();
  }, []);

  const renderWebinar = () => {
    // const { status } = webinar;

    return (
      <>
        <h2 className="mt-5">Live Workshop: {webinar?.title}</h2>
        <iframe
          width={"80%"}
          height={"800px"}
          src={webinar?.webinar_link}
          title="UpgradeSkills Live Webinar"
        ></iframe>
      </>
    );
  };

  return (
    <div>
      <div className="section page-banner-noshapes"></div>
      <div className="section pb-5" style={{ marginTop: "-10px" }}>
        <div className="container">
          <div>
            <div className="row">
              {isLoading ? (
                <center className="mt-5">
                  <Spinner animation="border" variant="primary" />
                </center>
              ) : webinar === null ? (
                // <p>{error}</p>
                renderWebinar()
              ) : (
                renderWebinar()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
