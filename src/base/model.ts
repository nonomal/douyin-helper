export interface Aweme {
  id: string;
  videoUrls: string[];
  bestVideoUrl: string;
  author: User;
  description: string;
}

export interface User {
  id: string;
  nickname: string;
}
