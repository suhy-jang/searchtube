import React, { useState, useEffect } from 'react';
import VideoSearch from './components/videoSearch';
import VideoCard from './components/videoCard';
import { videoDataType } from './types';

function App() {
  const [keyword, setKeyword] = useState('');
  const [pageToken, setPageToken] = useState('');
  const [listItems, setListItems] = useState([]);

  const fetchData = () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=1&order=viewCount&pageToken=${pageToken}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setListItems(data.items);
        setPageToken(data.nextPageToken);
      });
  };

  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div className="bg-black w-screen h-screen py-10">
      <VideoSearch searchKeyword={setKeyword} />
      {keyword && !listItems && (
        <div className="bg-black w-screen h-screen absolute top-0" />
      )}
      {listItems &&
        listItems.map((data: videoDataType) => (
          <VideoCard
            key={data.id.videoId}
            data={data}
            onEnd={() => fetchData()}
          />
        ))}
    </div>
  );
}

export default App;
