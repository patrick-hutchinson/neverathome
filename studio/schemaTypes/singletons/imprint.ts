import {defineField, defineType} from 'sanity'

export const imprint = defineType({
  name: 'imprint',
  title: 'Imprint',
  type: 'document',
  fields: [
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
