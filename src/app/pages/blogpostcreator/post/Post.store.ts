import { storageItemSet } from '@app/storage/storageItemSet';
import { createSelectors } from '@app/store/createSelectors';
import { create } from 'zustand';
import { POST_STORAGE_KEY } from './Post.const';
import type { PostSection, PostSectionData, PostStore } from './Post.types';
import { createDraft, loadInitialPostJson, updateSectionByIndex } from './Post.utils';

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

  // Editing an existing section
  openSectionIdDialog: (id) =>
    set({
      draftSection: null,
      sectionId: id,
      sectionIdDialogOpen: true,
    }),

  // Closing/cancelling discards any draft
  closeSectionIdDialog: () =>
    set({
      sectionIdDialogOpen: false,
      draftSection: null,
    }),

  // Adding a new section: nothing is written to postJson until Save
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

usePostStoreBase.subscribe((state, prev) => {
  if (state.postJson !== prev.postJson) {
    storageItemSet(localStorage, POST_STORAGE_KEY, state.postJson, 999999);
  }
});

export const usePostStore = createSelectors(usePostStoreBase);
