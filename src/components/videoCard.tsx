import React from 'react';
import { videoDataType } from '../types';
import YouTube from 'react-youtube';

const videoCard = ({
  data,
  onEnd,
}: {
  data: videoDataType;
  onEnd: () => void;
}) => {
  const youtubeHost = 'https://www.youtube.com/';

  const opts = {
    playerVars: {
      autoplay: 1 as const,
      origin: youtubeHost,
    },
  };

  return (
    <>
      <YouTube
        videoId={data.id.videoId}
        id={data.id.videoId}
        className={`appearance-none border-0 absolute top-0 left-0 w-screen h-screen`}
        containerClassName={'bg-blue-500'}
        opts={opts}
        onReady={(e) => e.target.playVideo()}
        onEnd={onEnd}
      />
      <div className="bg-gray-50">
        <div className="font-bold">{data.snippet.title}</div>
        <div className="text-gray-700">{data.snippet.channelTitle}</div>
      </div>
    </>
  );
};

export default videoCard;
