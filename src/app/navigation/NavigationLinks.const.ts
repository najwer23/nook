export type NavigationLink = { to: string; label: string };
export type NavigationLinkSection = { title: string; links: NavigationLink[] };

export const isExternalLink = (to: string) => /^https?:\/\//i.test(to);

const byLabel = (a: NavigationLink, b: NavigationLink) => a.label.localeCompare(b.label);

const sections: NavigationLinkSection[] = [
  {
    title: 'Tools',
    links: [
      { to: '/weather', label: 'Weather' },
      { to: '/', label: 'About' },
      { to: '/stock-quotes', label: 'Stock Quotes' },
      { to: '/visitors', label: 'Visitors' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { to: 'https://najwer23gym.vercel.app/', label: 'Gym' },
      { to: 'https://najwer23.github.io/najwer23morsels', label: 'Design System' },
    ],
  },
  {
    title: 'More Me',
    links: [
      { to: 'https://najwer23.github.io/', label: 'Portfolio' },
      { to: 'https://najwer23.github.io/resume/', label: 'Résumé' },
      { to: 'https://najwer23.github.io/#/blog', label: 'Blog' },
      { to: 'https://najwer23.github.io/#/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Social Media',
    links: [
      { to: 'https://www.npmjs.com/~najwer23', label: 'NPM' },
      { to: 'https://github.com/najwer23', label: 'GitHub' },
      { to: 'https://linkedin.com/in/najwer23', label: 'Linkedin' },
      { to: 'https://x.com/najwer23', label: 'X' },
      { to: 'https://pl.pinterest.com/najwer23/', label: 'Pinterest' },
      { to: 'https://leetcode.com/u/najwer23/', label: 'Leetcode' },
      { to: 'https://gitfut.com/najwer23', label: 'Gitfut' },
    ],
  },
];

export const navigationLinkSections: NavigationLinkSection[] = sections.map((section) => ({
  ...section,
  links: [...section.links].sort(byLabel),
}));
