import {defineField, defineType} from 'sanity'

export const workshops = defineType({
  name: 'workshops',
  title: 'Workshops',
  type: 'document',
  fields: [
    defineField({name: 'page', type: 'reference', to: [{type: 'page'}], title: 'Page'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        sortable: true, // 👈 enables drag-and-drop reordering
      },
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
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
    defineField({
      name: 'highlights',
      title: 'Selected Highlights',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'highlight'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this highlight'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Workshops Page'}),
  },
})
