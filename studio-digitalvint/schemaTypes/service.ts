import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'iconName',
      title: 'Lucide Icon Name (e.g. Layout, TrendingUp)',
      type: 'string',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Background Image URL (from Vercel Blob)',
      type: 'url',
    }),
    defineField({
      name: 'color',
      title: 'Tailwind Gradient Classes',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'Service FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string'},
            {name: 'answer', title: 'Answer', type: 'text'},
          ],
        },
      ],
      description: 'Add dynamic FAQs for this service (Automatically used for SEO/Schema).',
    }),
    defineField({
      name: 'longContent',
      title: 'Detailed Page Content (HTML)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'number',
    },
  },
})
