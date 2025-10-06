import {defineType, defineField} from 'sanity'

export const colorPair = defineType({
  name: 'colorPair',
  title: 'Color Pair',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'simplerColor',
    }),
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'simplerColor',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Color Pair'}),
  },
})
