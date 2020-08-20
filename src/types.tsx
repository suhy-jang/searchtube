export interface videoDataType {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      default: {
        height: number;
        width: number;
        url: string;
      };
    };
  };
}

export interface videoCardType {
  videoId: string;
  title: string;
  channel: string;
}
