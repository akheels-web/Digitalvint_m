import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'snippet',
      title: 'Short Description (Snippet)',
      type: 'text',
      description: 'The short preview text shown on the main blogs page.',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Quick Digest (Key Takeaways)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'A few bullet points summarizing the article. Appears at the very top of the post.',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        {type: 'callout'},
        {type: 'tweetQuote'},
        {type: 'expandable'},
      ],
      description: 'The main body of the blog post.',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'Example: "5 min read"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Marketing', value: 'Marketing'},
          {title: 'SEO', value: 'SEO'},
          {title: 'Branding', value: 'Branding'},
          {title: 'Web Dev', value: 'Web Dev'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})
