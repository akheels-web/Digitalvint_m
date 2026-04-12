import {defineField, defineType} from 'sanity'

export const calloutType = defineType({
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Information (Blue)', value: 'info'},
          {title: 'Warning (Yellow)', value: 'warning'},
          {title: 'Success/Pro-Tip (Green)', value: 'success'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      type: 'type',
    },
    prepare({title, subtitle, type}) {
      return {
        title: title || `Callout (${type})`,
        subtitle: subtitle,
      }
    },
  },
})
