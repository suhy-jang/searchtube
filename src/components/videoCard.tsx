import React, { useState } from 'react';
import { videoDataType } from '../types';
import YouTube from 'react-youtube';
import { useLocation, useHistory, Redirect } from 'react-router-dom';

interface LocationState {
  items: videoDataType[];
  nextPageToken: string;
}

interface CurrItem {
  index: number;
  data?: videoDataType;
}

const VideoCard = () => {
  const history = useHistory();
  const location = useLocation<undefined | LocationState>();
  const [currItem, setCurrItem] = useState<CurrItem>({
    index: 0,
    data: location.state ? location.state.items[0] : undefined,
  });

  const onEnd = () => {
    if (location.state) {
      const { items } = location.state;
      const nextIndex = currItem.index + 1;
      if (nextIndex < location.state.items.length) {
        return setCurrItem({ index: nextIndex, data: items[nextIndex] });
      }
    }

    const nextPageToken = location.state ? location.state.nextPageToken : '';

    history.push({
      pathname: '/',
      state: { nextPageToken },
    });
  };

  if (!location.search || !location.state) {
    return <Redirect to="/" />;
  }

  const opts = {
    playerVars: {
      autoplay: 1 as const,
      origin: 'https://www.youtube.com/',
    },
  };

  return (
    <>
      {currItem.data && (
        <YouTube
          videoId={currItem.data.id.videoId}
          id={currItem.data.id.videoId}
          className={`appearance-none border-0 absolute top-0 left-0 w-screen h-screen`}
          containerClassName={'bg-blue-500'}
          opts={opts}
          onReady={(e) => e.target.playVideo()}
          onEnd={onEnd}
        />
      )}
    </>
  );
};

export default VideoCard;
