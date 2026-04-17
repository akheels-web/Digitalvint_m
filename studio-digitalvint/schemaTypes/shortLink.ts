import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const shortLinkType = defineType({
  name: 'shortLink',
  title: 'Vint-Short Links',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Link Title / Name',
      type: 'string',
      description: 'Internal reference name (e.g., Summer Campaign 2026)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Short Path / Slug',
      type: 'slug',
      description: 'The short part of the URL (e.g., "promo" for labs.digitalvint.com/s/promo)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination URL (Long URL)',
      type: 'url',
      description: 'Where should this link redirect to?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clicks',
      title: 'Total Clicks',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Automatically tracked number of visitors who used this link.',
    }),
    defineField({
      name: 'description',
      title: 'Notes / Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: `/s/${subtitle}`
      }
    }
  },
})
