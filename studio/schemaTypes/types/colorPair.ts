import {defineType, defineField} from 'sanity'
import {ColorWheelIcon} from '@sanity/icons'

export const colorPair = defineType({
  name: 'colorPair',
  title: 'Color Pairs',
  icon: ColorWheelIcon,
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
