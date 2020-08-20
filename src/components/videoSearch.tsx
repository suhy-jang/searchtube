import React, { useState } from 'react';

interface VideoSearchProps {
  searchKeyword: (keyword: string) => void;
}

const VideoSearch = ({ searchKeyword }: VideoSearchProps) => {
  const [keyword, setKeyword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    searchKeyword(keyword);
  };

  return (
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
            className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoSearch;
