export type NavigationLinkType = 'internal' | 'external' | 'externalBlank';

export type NavigationOnly = 'mobile' | 'aside';

export type NavigationLink = {
  to: string;
  label: string;
  type?: NavigationLinkType;
  only?: NavigationOnly;
};

export type NavigationLinkSection = {
  title: string;
  links: NavigationLink[];
};
