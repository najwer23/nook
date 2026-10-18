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

export type AddableSectionName = Extract<
  PostSection['name'],
  'post-title' | 'post-p' | 'post-subheading' | 'post-code'
>;

export type PostStore = {
  postJson: PostJson;
  sectionId: number;
  sectionIdDialogOpen: boolean;
  importDialogOpen: boolean;
  draftSection: PostSection | null;
  setPostJson: (updater: (prev: PostJson) => PostJson) => void;
  openSectionIdDialog: (id: number) => void;
  openImportDialog: () => void;
  closeSectionIdDialog: () => void;
  closeImportDialog: () => void;
  startAddSection: (name: AddableSectionName) => void;
  commitDraftSection: (data: PostSection['data'], newIndex: string) => void;
  removeSection: (index: number) => void;
  updateSectionData: <K extends PostSection['name']>(
    index: number,
    name: K,
    data: PostSectionData<K>,
    newIndex: string,
  ) => void;
  updateSectionDataAndTitle: (
    index: number,
    name: 'post-title',
    data: PostSectionData<'post-title'>,
    newIndex: string,
  ) => void;
};
