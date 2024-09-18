import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { VimeoPlayer } from "../ReactPlayer/VimeoPlayer";

function CoursePreviewModal({ videoUrl, _handleClickPreview}) {
  return (
    <div
          className="modal"
          style={{
            animationDuration: "0s",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            animationName: "unset",
          }}
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Preview
                </h5>
                <button
                  onClick={() => _handleClickPreview(null)}
                  type="button"
                  data-modal-hide="medium-modal"
                  class="btn btn-link mt-0"
                  style={{ position: "absolute", right: 0, width: "unset" }}
                >
                  X<span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className='modal-body'>

                <div
            className="courses-details-images"
            style={{width: '26em'}}
            // style={{ paddingBottom: "56%" }}
        >
            <div className="video-wrapper">
            <VimeoPlayer url={videoUrl} />
            </div>
        </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CoursePreviewModal