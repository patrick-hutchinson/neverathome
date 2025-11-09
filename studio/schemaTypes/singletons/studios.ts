import {defineField, defineType} from 'sanity'

import {thumbnail} from '../types/thumbnail'
import {gallery} from '../types/gallery'

export const studios = defineType({
  name: 'studios',
  title: 'Studios',
  type: 'document',
  fields: [
    gallery,
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
