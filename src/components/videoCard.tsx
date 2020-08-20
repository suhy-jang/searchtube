import React from 'react';
import { videoDataType } from '../types';

const videoCard = ({ data }: { data: videoDataType }) => {
  return (
    <>
      <iframe
        title={data.id.videoId}
        src={`https://www.youtube.com/embed/${data.id.videoId}?`}
        className="appearance-none border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="bg-gray-50">
        <div className="font-bold">{data.snippet.title}</div>
        <div className="text-gray-700">{data.snippet.channelTitle}</div>
      </div>
    </>
  );
};

export default videoCard;
