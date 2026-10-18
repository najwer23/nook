import { storageItemGet } from '@app/storage/storageItemGet';
import { EMPTY_POST, POST_STORAGE_KEY } from './Post.const';
import type { AddableSectionName, PostSection, PostSectionData, PostStore } from './Post.types';

export const moveItem = <T>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const draftFactories: Record<AddableSectionName, () => PostSection> = {
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

export const createDraft = (name: AddableSectionName): PostSection => draftFactories[name]();

export const updateSectionByIndex = <K extends PostSection['name']>(
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

export const loadInitialPostJson = () => storageItemGet(localStorage, POST_STORAGE_KEY) ?? EMPTY_POST;
