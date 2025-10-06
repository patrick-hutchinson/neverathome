import {defineField, defineType} from 'sanity'

export const workshops = defineType({
  name: 'workshops',
  title: 'Workshops',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
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
    prepare: () => ({title: 'Workshops Page'}),
  },
})
