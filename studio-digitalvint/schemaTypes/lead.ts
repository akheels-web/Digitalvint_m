import {defineField, defineType} from 'sanity'

export const leadType = defineType({
  name: 'lead',
  title: 'Leads (CRM)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Prospect Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'service',
      title: 'Service Interested In',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'source',
      title: 'Source Form',
      type: 'string',
      description: 'e.g., Contact Form, Free Audit, Blog Sidebar',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Qualified', value: 'qualified'},
          {title: 'Closed (Won)', value: 'won'},
          {title: 'Lost', value: 'lost'},
        ],
      },
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Add sales notes here about your calls/emails with this lead.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
    },
  },
})
