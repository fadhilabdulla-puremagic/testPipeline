import React from 'react';
import ReactPlayer from 'react-player';
import './player.css';

export const VimeoPlayer = ({ url }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        url={url}
        className='react-player'
        playing={false}
        controls={false}
        width="100%"
        height="100%"
        config={{
          vimeo: {
            playerOptions: {
              controls: true
            }
          }
        }}
        start={0}
        end={120}
      />
    </div>
  );
};


