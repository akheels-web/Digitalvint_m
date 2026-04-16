import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Our Work / Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Website Development', 'SEO', 'Performance Marketing', 'Packaging Design', 'SaaS', 'E-commerce'],
      }
    }),
    defineField({
      name: 'description',
      title: 'Short Description / Outcome',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Project Image URL (from Vercel Blob)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Key Results / Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'metric', type: 'string', title: 'Metric (e.g. +150%)'},
          {name: 'label', type: 'string', title: 'Label (e.g. Traffic Growth)'}
        ]
      }]
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Live Website URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
