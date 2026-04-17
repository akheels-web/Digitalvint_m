import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'agencyName',
      title: 'Agency Name',
      type: 'string',
      initialValue: 'Digital Vint',
    }),
    defineField({
      name: 'description',
      title: 'Meta Description (Global)',
      type: 'text',
      description: 'The fallback SEO description for the website.',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      initialValue: 'Hyderabad, India',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Format: 91XXXXXXXXXX',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
  ],
})
