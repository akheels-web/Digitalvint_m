import {defineField, defineType} from 'sanity'

export const tweetQuoteType = defineType({
  name: 'tweetQuote',
  title: 'Tweetable Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Who said it? (Optional)',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'author',
    },
  },
})
