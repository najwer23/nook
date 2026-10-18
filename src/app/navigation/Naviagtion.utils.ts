import type { NavigationLink, NavigationLinkSection } from './Naviagtion.types';

export const isExternalLink = (to: string) => /^https?:\/\//i.test(to);

export const byLabel = (a: NavigationLink, b: NavigationLink) => a.label.localeCompare(b.label);

export const navigationLinkSectionsSort = (sections: NavigationLinkSection[]): NavigationLinkSection[] =>
  sections.map((section) => ({
    ...section,
    links: [...section.links].sort(byLabel),
  }));
