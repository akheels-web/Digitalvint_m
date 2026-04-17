import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Portfolio (Works)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            {title: 'E-Commerce', value: 'E-Commerce'},
            {title: 'News Portal', value: 'News Portal'},
            {title: 'Brand Website', value: 'Brand Website'},
            {title: 'Corporate / SaaS', value: 'Corporate / SaaS'},
            {title: 'Web Application', value: 'Web Application'},
            {title: 'Local SEO', value: 'Local SEO'},
          ],
        },
      }),
    defineField({
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'year',
      title: 'Project Year',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Hyderabad, India',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Appears on the cards in the portfolio grid.',
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
      name: 'tags',
      title: 'Tags / Technologies',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'stats',
      title: 'Project Results (Stats)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
  ],
})
