import {defineField, defineType} from 'sanity'

export const imprint = defineType({
  name: 'imprint',
  title: 'Imprint',
  type: 'document',
  fields: [
    defineField({name: 'page', type: 'reference', to: [{type: 'page'}], title: 'Page'}),
    defineField({
      name: 'imprint',
      title: 'Imprint',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Imprint Page'}),
  },
})
