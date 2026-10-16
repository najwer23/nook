export type PostSectionMap = {
  'post-title': {
    title: string;
    date: string;
  };
  'post-p': {
    text: string;
  };
  'post-subheading': {
    text: string;
  };
  'post-code': {
    code: string;
  };
  quote: {
    text: string;
  };
  group: {
    children: PostSection[];
  };
};

export type PostSection = {
  [K in keyof PostSectionMap]: {
    name: K;
    data: PostSectionMap[K];
  };
}[keyof PostSectionMap];

export type PostSectionByName<K extends PostSection['name']> = Extract<PostSection, { name: K }>;

export type PostSectionData<K extends PostSection['name']> = PostSectionByName<K>['data'];

export interface PostJson {
  title: string;
  id: string;
  sections: PostSection[];
}
