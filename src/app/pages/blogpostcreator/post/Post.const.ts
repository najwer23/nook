import type { PostJson } from './Post.types';

export const POST_STORAGE_KEY = 'blog-post-creator';

export const EMPTY_POST: PostJson = {
  title: '',
  id: '',
  sections: [],
};
