import {defineField, defineType} from 'sanity'

import {thumbnail} from '../types/thumbnail'

export const studios = defineType({
  name: 'studios',
  title: 'Studios',
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
      name: 'studios',
      title: 'Selected Studios',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'studio'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this studio'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Studio Page'}),
  },
})
