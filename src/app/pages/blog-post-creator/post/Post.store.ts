import { storageItemGet } from '@app/storage/storageItemGet';
import { createSelectors } from '@app/store/createSelectors';
import { create } from 'zustand';
import type { PostJson, PostSection, PostSectionData } from './Post.types';

export const EMPTY_POST: PostJson = {
  title: '',
  id: '',
  sections: [],
};

type AddableSectionName = Extract<PostSection['name'], 'post-title' | 'post-p' | 'post-subheading' | 'post-code'>;

type PostStore = {
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

const moveItem = <T>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const draftFactories: Record<AddableSectionName, () => PostSection> = {
  'post-title': () => ({ name: 'post-title', data: { title: '#', date: '29/03/2026' } }),
  'post-p': () => ({ name: 'post-p', data: { text: 'Example' } }),
  'post-subheading': () => ({ name: 'post-subheading', data: { text: 'Example' } }),
  'post-code': () => ({
    name: 'post-code',
    data: {
      code: 'const users = [\n  { name: "Anna", age: 32 },\n  { name: "Bob", age: 28 },\n  { name: "Cara", age: 40 },\n];\n\nconst byAge = users.sort((a, b) => a.age - b.age);\n',
    },
  }),
};

const createDraft = (name: AddableSectionName): PostSection => draftFactories[name]();

const updateSectionByIndex = <K extends PostSection['name']>(
  state: PostStore,
  index: number,
  name: K,
  data: PostSectionData<K>,
  newIndex: string,
): PostStore => {
  const sections = state.postJson.sections.map((section, i) =>
    i === index && section.name === name ? ({ ...section, data } as PostSection) : section,
  );

  const nextIndex = Number(newIndex);
  const movedSections = nextIndex !== index ? moveItem(sections, index, nextIndex) : sections;

  return {
    ...state,
    postJson: {
      ...state.postJson,
      sections: movedSections,
    },
  };
};

const loadInitialPostJson = () => {
  const STORAGE_KEY = 'blog-post-creator';

  return storageItemGet(localStorage, STORAGE_KEY) ?? EMPTY_POST;
};

const usePostStoreBase = create<PostStore>()((set) => ({
  postJson: loadInitialPostJson(),
  sectionId: 0,
  sectionIdDialogOpen: false,
  importDialogOpen: false,
  draftSection: null,

  setPostJson: (updater) =>
    set((state) => ({
      postJson: updater(state.postJson),
    })),

  openImportDialog: () =>
    set({
      importDialogOpen: true,
    }),

  closeImportDialog: () =>
    set({
      importDialogOpen: false,
    }),

  openSectionIdDialog: (id) =>
    set({
      draftSection: null,
      sectionId: id,
      sectionIdDialogOpen: true,
    }),

  closeSectionIdDialog: () =>
    set({
      sectionIdDialogOpen: false,
      draftSection: null,
    }),

  startAddSection: (name) =>
    set((state) => ({
      draftSection: createDraft(name),
      sectionId: state.postJson.sections.length, // default position = end
      sectionIdDialogOpen: true,
    })),

  commitDraftSection: (data, newIndex) =>
    set((state) => {
      const draft = state.draftSection;
      if (!draft) return state;

      const sections = [...state.postJson.sections];
      const parsed = Number(newIndex);
      const target = Math.min(Math.max(Number.isNaN(parsed) ? sections.length : parsed, 0), sections.length);
      sections.splice(target, 0, { ...draft, data } as PostSection);

      const isTitle = draft.name === 'post-title';
      const titleData = data as PostSectionData<'post-title'>;

      return {
        draftSection: null,
        postJson: {
          ...state.postJson,
          sections,
          ...(isTitle && {
            id: titleData.title.match(/#(\d+)/)?.[1] ?? '',
            title: titleData.title,
          }),
        },
      };
    }),

  removeSection: (index) =>
    set((state) => ({
      postJson: {
        ...state.postJson,
        sections: state.postJson.sections.filter((_, i) => i !== index),
      },
    })),

  updateSectionData: (index, name, data, newIndex) =>
    set((state) => updateSectionByIndex(state, index, name, data, newIndex)),

  updateSectionDataAndTitle: (index, name, data, newIndex) =>
    set((state) => {
      return {
        postJson: {
          ...updateSectionByIndex(state, index, name, data, newIndex).postJson,
          id: data.title.match(/#(\d+)/)?.[1] ?? '',
          title: data.title,
        },
      };
    }),
}));

export const usePostStore = createSelectors(usePostStoreBase);
