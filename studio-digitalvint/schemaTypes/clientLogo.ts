import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const clientLogoType = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials (e.g. TZ) fallback',
      type: 'string',
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo Image URL (from Vercel Blob)',
      type: 'url',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active (Show on Website?)',
      type: 'boolean',
      initialValue: true,
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
      title: 'name',
      subtitle: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? 'Active' : 'Inactive'
      }
    }
  },
})
