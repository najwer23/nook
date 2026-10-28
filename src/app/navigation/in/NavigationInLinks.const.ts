import type { NavigationLinkSection } from '../Naviagtion.types';
import { navigationLinkSectionsSort } from '../Naviagtion.utils';

const sections: NavigationLinkSection[] = [
  {
    title: 'Account',
    links: [{ to: '/in/dashboard', label: 'Dashboard' }],
  },
  {
    title: 'Tools',
    links: [
      { to: '/in/weather', label: 'Weather' },
      { to: '/in/stock-quotes', label: 'Stock Quotes' },
      { to: '/in/visitors', label: 'Visitors' },
      { to: '/in/blog-post-creator', label: 'Blog Post Creator' },
      { to: '/in/weight', label: 'Weight' },
      { to: '/in/vacations', label: 'Vacations' },
      { to: '/in/music', label: 'Music' },
    ],
  },
  {
    title: 'Radosna',
    links: [{ to: '/in/rent', label: 'Rent' }],
  },
  {
    title: 'Exercise',
    links: [
      { to: '/in/push-ups', label: 'Push Ups' },
      { to: '/in/squats', label: 'Squats' },
      { to: '/in/sit-ups', label: 'Sit-ups' },
      { to: '/in/pull-ups', label: 'Pull-ups' },
    ],
  },
  {
    title: 'Projects',
    links: [{ to: 'https://najwer23.github.io/najwer23morsels', label: 'Design System' }],
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
