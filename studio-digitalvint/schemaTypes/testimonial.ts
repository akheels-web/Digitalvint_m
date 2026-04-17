import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Avatar Image URL (from Vercel Blob)',
      type: 'url',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial/Quote text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
    },
  },
})
