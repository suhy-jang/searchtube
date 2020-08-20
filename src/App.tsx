import React, { useState } from 'react';
import VideoCard from './components/videoCard';
import { videoDataType } from './types';

function App() {
  const keyword = 'piano';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${keyword}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setListItems(data.items);
        console.log(data);
      });
  };

  return (
    <div>
      <div onClick={() => fetchData()}>click</div>
      {loading ? (
        <div>loading...</div>
      ) : (
        listItems.map((data: videoDataType) => (
          <VideoCard key={data.id.videoId} data={data} />
        ))
      )}
    </div>
  );
}

export default App;
