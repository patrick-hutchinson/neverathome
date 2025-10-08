import {defineType, defineField} from 'sanity'

export const colorPair = defineType({
  name: 'colorPair',
  title: 'Color Pair',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
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
})
