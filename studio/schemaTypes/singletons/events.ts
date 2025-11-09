import {defineField, defineType} from 'sanity'

import {thumbnail} from '../types/thumbnail'

export const events = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'highlights',
      title: 'Selected Highlights',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'highlight'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this highlight'),
    }),
    defineField({
      name: 'events',
      title: 'Selected Events',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this event'),
    }),
    defineField({
      name: 'residencies',
      title: 'Residencies',
      type: 'object',
      fields: [
        {name: 'thumbnail', title: 'Image', type: 'thumbnail'},
        {name: 'text', title: 'Text', type: 'string'},
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Event Page'}),
  },
})
