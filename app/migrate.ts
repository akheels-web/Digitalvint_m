import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Schema } from '@sanity/schema';
import { htmlToBlocks } from '@sanity/block-tools';
import { blogsData } from './src/data/blogs';

const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema.get('blogPost').fields.find(
  (field: any) => field.name === 'body'
).type;

const ndjsonLines: string[] = [];

for (const blog of blogsData) {
  // Convert HTML to Portable Text Blocks
  const blocks = htmlToBlocks(blog.content, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });

  const doc = {
    _id: `drafts.imported-post-${blog.id}`,
    _type: 'post',
    title: blog.title,
    slug: {
      _type: 'slug',
      current: blog.slug
    },
    snippet: blog.excerpt,
    author: blog.author,
    date: new Date(blog.date).toISOString(),
    readTime: blog.readTime,
    category: blog.category,
    content: blocks,
    image: {
      _type: "image",
      _sanityAsset: `image@${blog.image}`
    }
  };

  ndjsonLines.push(JSON.stringify(doc));
}

fs.writeFileSync('../studio-digitalvint/blogsToImport.ndjson', ndjsonLines.join('\n'));
console.log('Successfully generated blogsToImport.ndjson in the studio folder!');
