export type NavigationLinkType = 'internal' | 'external' | 'externalBlank';

export type NavigationLink = {
  to: string;
  label: string;
  type?: NavigationLinkType;
};

export type NavigationLinkSection = {
  title: string;
  links: NavigationLink[];
};
