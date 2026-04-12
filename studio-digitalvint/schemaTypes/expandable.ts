import {defineField, defineType} from 'sanity'

export const expandableType = defineType({
  name: 'expandable',
  title: 'Expandable Snippet (Read More)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Visible Title',
      type: 'string',
      description: 'The text users click to expand (e.g., "Deep Dive Info...")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Hidden Content',
      type: 'text',
      description: 'The text that reveals when clicked.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'content',
    },
  },
})
