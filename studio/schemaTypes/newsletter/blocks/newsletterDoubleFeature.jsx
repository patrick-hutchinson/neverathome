import {InlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const newsletterDoubleFeature = defineType({
  name: 'newsletterDoubleFeature',
  title: 'Features (genau 2!)',
  icon: InlineIcon,
  type: 'object',

  fields: [
    defineField({name: 'sectionHeader', title: 'Modul Überschrift', type: 'string'}),
    defineField({
      name: 'story',
      title: 'Feature',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'featureTitle',
              title: 'Leitender Text',
              type: 'string',
            }),
            defineField({
              name: 'colorPair',
              title: 'Farbkombination',
              type: 'reference',
              to: {type: 'colorPair'},
              validation: (Rule) => Rule.required().error('Du musst eine Farbkombination angeben.'),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
            }),
            defineField({name: 'runningText', type: 'array', of: [{type: 'block'}]}),
          ],
        },
      ],
      options: {
        maxLength: 2,
      },
      validation: (Rule) => Rule.required().min(2).max(2).error('Bitte genau 2 Features anlegen.'),
    }),
  ],
  preview: {
    select: {
      title: 'Features',
    },
    prepare({title, image}) {
      return {
        title: 'Features',
        subtitle: 'Zwei Features mit Bild und Text.',
      }
    },
  },
})
