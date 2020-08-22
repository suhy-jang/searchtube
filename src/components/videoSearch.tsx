import React, { useState } from 'react';
import { YoutubeData } from '../types';
import { useLocation, useHistory } from 'react-router-dom';

interface LocationState {
  nextPageToken: string;
}

const VideoSearch = () => {
  const location = useLocation<undefined | LocationState>();
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  const fetchData = () => {
    setNotFound(false);
    const pageToken = location.state ? location.state.nextPageToken : '';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&pageToken=${pageToken}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { items, nextPageToken, error }: YoutubeData = data;
        if (!items && error) return setError(error.errors[0].reason);
        if (items.length === 0) return setNotFound(true);
        history.push({
          pathname: '/video',
          search: `?query=${keyword.split(' ').join('+')}`,
          state: {
            items,
            nextPageToken,
          },
        });
      })
      .catch((err) => setError(`${err}, API error`));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (/^\s*$/.test(keyword)) {
      return setKeyword('');
    }
    fetchData();
  };

  return (
    <div className="bg-black w-screen h-screen py-10">
      <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          <div className="flex items-center border-b border-b-2 border-red-500 py-2">
            <input
              type="text"
              placeholder="Search Video..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 focus:outline-none text-sm border-4 text-white py-1 px-2 rounded"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {notFound && (
        <div className="text-2xl text-gray-200 text-center mx-auto mt-32">
          No Video Found
        </div>
      )}
      {error && (
        <div className="text-gray-200 text-center">
          {error}, try it after 24hours later!
        </div>
      )}
    </div>
  );
};

export default VideoSearch;
