export interface videoDataType {
  id: {
    videoId: string;
  };
}

export interface YoutubeData {
  items: videoDataType[];
  nextPageToken: string;
  error: {
    errors: {
      reason: string;
    }[];
  };
}
