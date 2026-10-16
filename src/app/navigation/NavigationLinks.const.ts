export type NavigationLink = { to: string; label: string };
export type NavigationLinkSection = { title: string; links: NavigationLink[] };

export const isExternalLink = (to: string) => /^https?:\/\//i.test(to);

const byLabel = (a: NavigationLink, b: NavigationLink) => a.label.localeCompare(b.label);

const sections: NavigationLinkSection[] = [
  {
    title: 'Tools',
    links: [
      { to: '/weather', label: 'Weather' },
      { to: '/stock-quotes', label: 'Stock Quotes' },
      { to: '/visitors', label: 'Visitors' },
    ],
  },
  {
    title: 'Apps',
    links: [
      { to: 'https://najwer23.github.io/', label: 'Portfolio' },
      { to: 'https://najwer23.github.io/#/contact', label: 'Contact' },
      { to: 'https://najwer23.github.io/#/blog', label: 'Blog' },
      { to: 'https://najwer23gym.vercel.app/', label: 'Gym' },
    ],
  },
  {
    title: 'Social Media',
    links: [
      { to: 'https://www.npmjs.com/~najwer23', label: 'NPM' },
      // { to: 'https://github.com/najwer23', label: 'GitHub' },
    ],
  },
];

export const navigationLinkSections: NavigationLinkSection[] = sections.map((section) => ({
  ...section,
  links: [...section.links].sort(byLabel),
}));
