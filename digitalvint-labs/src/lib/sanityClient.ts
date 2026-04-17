import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'x6r02qtl',
  dataset: 'production',
  useCdn: false, // Use false for real-time redirects
  apiVersion: '2023-01-01',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, // Needed for click tracking
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

// Helper for URL Redirection
export const getDestination = async (slug: string) => {
  const query = `*[_type == "shortLink" && slug.current == $slug][0] {
    destination,
    _id,
    clicks
  }`;
  return await client.fetch(query, { slug });
};

// Helper for Click Tracking
export const trackClick = async (id: string, currentClicks: number) => {
  return await client
    .patch(id)
    .set({ clicks: (currentClicks || 0) + 1 })
    .commit();
};

// Helper for Creating Short Link
export const createShortLink = async (title: string, destination: string, slug: string) => {
  const doc = {
    _type: 'shortLink',
    title,
    destination,
    slug: {
      _type: 'slug',
      current: slug
    },
    clicks: 0
  };
  return await client.create(doc);
};
