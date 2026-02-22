import {CalendarIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export const newsletterCalendar = defineType({
  name: 'newsletterCalendar',
  type: 'object',
  icon: CalendarIcon,
  title: 'Events',
  fields: [
    defineField({name: 'sectionHeader', title: 'Modul Überschrift', type: 'string'}),
    defineField({
      name: 'event',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'event'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Newsletter Calendar',
    },
    prepare({title, image}) {
      return {
        title: title || 'News/Open Call',
        subtitle: 'Wähle Event Einträge aus',
        // media: image || DocumentTextIcon,
      }
    },
  },
})
