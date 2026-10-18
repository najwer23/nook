import type { NavigationLinkSection } from '../Naviagtion.types';
import { navigationLinkSectionsSort } from '../Naviagtion.utils';

const sections: NavigationLinkSection[] = [
  {
    title: 'Tools',
    links: [
      { to: '/in/dashboard', label: 'Dashboard' },
      { to: '/in/weather', label: 'Weather' },
      { to: '/in/stock-quotes', label: 'Stock Quotes' },
      { to: '/in/visitors', label: 'Visitors' },
      { to: '/in/blog-post-creator', label: 'Blog post creator' },
      { to: '/in/weight', label: 'Weight' },
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

export const navigationInLinkSections: NavigationLinkSection[] = navigationLinkSectionsSort(sections);
