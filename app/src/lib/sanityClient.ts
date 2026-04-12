import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'x6r02qtl', // from your setup
  dataset: 'production',
  apiVersion: '2024-03-12', // Ensure fresh API usage
  useCdn: true, // false for fresh data, true for cached performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
