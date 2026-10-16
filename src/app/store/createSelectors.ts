import { type StoreApi, type UseBoundStore, useStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {} as any;

  for (const key of Object.keys(store.getState())) {
    (store.use as any)[key] = () => useStore(_store, (state) => state[key as keyof typeof state]);
  }

  return store;
};
