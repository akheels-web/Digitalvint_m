import type { PortableTextBlock } from '@portabletext/types';
import type { SanityDocument } from '@sanity/client';

export interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityPost extends SanityDocument {
  title: string;
  slug: { current: string };
  snippet: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: SanityImageReference; // Strict Sanity Image reference
  content?: PortableTextBlock[];
  tags?: string[];
  aiSummary?: string[];
}
