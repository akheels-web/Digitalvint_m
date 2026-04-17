import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Our Work / Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name / Title',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Hyderabad, India',
    }),
    defineField({
      name: 'year',
      title: 'Project Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'tags',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
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
      media: 'mainImage'
    },
  },
})
