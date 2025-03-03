export interface Post {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
}

export interface PostsState {
  posts: Post[];
}
