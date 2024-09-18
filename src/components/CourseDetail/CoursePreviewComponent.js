import React from "react";
import { VimeoPlayer } from "../ReactPlayer/VimeoPlayer";

import Accordion from "react-bootstrap/Accordion";

function CoursePreviewComponent({ sections }) {
  return sections && sections.length > 0 ? (
    <div>
      <h3>Previews</h3>
      <Accordion>
        {sections.map((section, i) => {
          return (
            <Accordion.Item eventKey={i}>
              <Accordion.Header>{section.title}</Accordion.Header>
              <Accordion.Body>
                <div
                  className="courses-details-images"
                  style={{ paddingBottom: "56%" }}
                >
                  <div className="video-wrapper">
                    <VimeoPlayer url={section.video_url} />
                  </div>
                </div>

                <div className="py-5">
                  <dd
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  ></dd>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  ) : (
    <></>
  );
}

export default CoursePreviewComponent;
