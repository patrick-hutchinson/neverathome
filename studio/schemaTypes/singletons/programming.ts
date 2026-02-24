import {defineField, defineType} from 'sanity'

import {gallery} from '../types/gallery'

export const programming = defineType({
  name: 'programming',
  title: 'Programming',
  type: 'document',
  fields: [
    defineField({name: 'page', type: 'reference', to: [{type: 'page'}], title: 'Page'}),
    gallery,
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
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
      name: 'features',
      title: 'Selected Features: Fuer das Residency Modul',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'feature'}]}],
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
    defineField({
      name: 'selectedResidencies',
      title: 'Selected Residencies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this event'),
      description: 'Hier beliebige Residencies aus der Events Kategorie verknuepfen.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Programming Page'}),
  },
})
