import { useEffect } from "react";
import { getBannerMarquee } from "../../context/actions/getBannerMarquee";
import { useState } from "react";
function SiteMarquee() {
  const [marqueeStrings, setMarqueeStrings] = useState(null);

  const getData = () => {
    const response = getBannerMarquee();
    response.then((res) => {
      // console.log(res);
      if (
        res.response &&
        res.response.status === 500 &&
        res.code === "ERR_BAD_RESPONSE"
      ) {
      } else if (res.data && res.data.status == "TRUE") {
        setMarqueeStrings(res.data?.marquee);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    marqueeStrings &&
    marqueeStrings.length > 0 && (
      <div className="marquee-header">
        {marqueeStrings.map((el, i) => {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: `${el}`,
              }}
            ></span>
          );
        })}
      </div>
    )
  );
}
export default SiteMarquee;
