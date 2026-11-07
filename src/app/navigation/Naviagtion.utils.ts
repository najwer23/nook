import type { NavigationLink, NavigationLinkSection, NavigationLinkType, NavigationOnly } from './Naviagtion.types';

export const isExternalLink = (to: string) => /^https?:\/\//i.test(to);

export const getNavigationLinkType = ({ type, to }: NavigationLink): NavigationLinkType =>
  type ?? (isExternalLink(to) ? 'externalBlank' : 'internal');

export const getNavigationLinkProps = (type: NavigationLinkType, to: string, navigate: (to: string) => void) => {
  if (type === 'internal') {
    return {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(to);
      },
    };
  }

  if (type === 'externalBlank') {
    return { target: '_blank', rel: 'noopener noreferrer' };
  }

  return {};
};

export const byLabel = (a: NavigationLink, b: NavigationLink) => a.label.localeCompare(b.label);

export const navigationLinkSectionsSort = (sections: NavigationLinkSection[]): NavigationLinkSection[] =>
  sections.map((section) => ({
    ...section,
    links: [...section.links].sort(byLabel),
  }));

// Naviagtion.utils.ts
export const navigationLinkSectionsFilter = (
  sections: NavigationLinkSection[],
  target: NavigationOnly,
): NavigationLinkSection[] =>
  sections
    .map((section) => ({
      ...section,
      links: section.links.filter(({ only }) => !only || only === target),
    }))
    .filter(({ links }) => links.length > 0);
