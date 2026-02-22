import {defineField, defineType} from 'sanity'

import {TextIcon} from '@sanity/icons'

export const newsletterAnnouncement = defineType({
  name: 'newsletterAnnouncement',
  title: 'Announcement',
  icon: TextIcon,
  type: 'object',
  fields: [
    defineField({name: 'sectionHeader', title: 'Modul Überschrift', type: 'string'}),
    defineField({name: 'announcementText', type: 'array', of: [{type: 'block'}]}),
  ],

  preview: {
    select: {
      title: 'Announcement',
    },
    prepare({title, image}) {
      return {
        title: 'Announcement',
        subtitle: 'Großer Fließtext in voller Breite.',
        media: TextIcon,
      }
    },
  },
})
