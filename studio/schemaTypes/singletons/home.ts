import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Opening Images',
      type: 'array',
      of: [{type: 'image'}],
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
      title: 'Selected Features',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'feature'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this event'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
