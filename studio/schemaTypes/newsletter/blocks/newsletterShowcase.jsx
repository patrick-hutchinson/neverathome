import {defineField, defineType} from 'sanity'

import {ImageIcon} from '@sanity/icons'

export const newsletterShowcase = defineType({
  name: 'newsletterShowcase',
  title: 'Showcase',
  icon: ImageIcon,
  type: 'object',

  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'reference',
      to: {type: 'eventType'},
    }),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'textTitle', title: 'Text Überschrift', type: 'string'}),
    defineField({name: 'text', title: 'Fließtext', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {
    select: {
      title: 'Showcase',
    },
    prepare({title, image}) {
      return {
        title: 'Showcase',
        subtitle: 'Ein promimentes Cover Bild mit Text darunter. ',
        // media: TextIcon,
      }
    },
  },
})
