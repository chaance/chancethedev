// Use to extend JSX Element props by passing a string reference to the tag
// e.g.: interface MyButtonProps extends Element<'button'>
export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

// Use to map types to another interface where all keys are optional
// https://stackoverflow.com/a/40076355
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface SiteMetadata {
  siteUrl: string;
  title: string;
  twitterHandle: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  image: string;
  author: {
    name: string;
    email: string;
    minibio: string;
  };
  organization: {
    name: string;
    url: string;
    logo: string;
  };
  social: {
    twitter: string;
    fbAppID?: string;
    itunesAppId?: string;
  };
}

export interface Frontmatter {
  author?: string;
  title: string;
  subtitle?: string;
  date: string;
  langs?: string[];
  description?: string;
  banner?: any;
  bannerAlt?: string;
  keywords?: string[];
  published: boolean;
  slug?: string;
}

export type SiteNode = any; // TODO

export interface AuthorNode {
  id: string;
  slug: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  children?: SiteNode[];
  parent?: SiteNode;
  internal: {
    content?: any;
    contentDigest: string;
    description?: any;
    fieldOwners?: any;
    ignoreType?: any;
    mediaType?: any;
    owner: 'default-site-plugin';
    type: 'Authors';
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
