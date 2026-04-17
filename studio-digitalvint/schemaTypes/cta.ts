import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'Marketing Call to Action (CTA)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'e.g., Blog Bottom - Free Audit',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL or /contact',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The big text above the button.',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'Supporting text for the offer.',
    }),
    defineField({
      name: 'variant',
      title: 'Visual Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Premium (Blue/Purple)', value: 'premium'},
          {title: 'Minimal (Outline)', value: 'outline'},
          {title: 'Urgent (Red/Warning)', value: 'urgent'},
        ],
      },
    }),
  ],
})
