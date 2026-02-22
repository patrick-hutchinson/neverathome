import {defineArrayMember, defineField, defineType} from 'sanity'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Bitte gebe einen Titel an.'),
    }),
    defineField({
      name: 'release',
      title: 'Release',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Email: Betreff',
      type: 'string',
      validation: (Rule) => Rule.required().error('Bitte gebe einen Email Betreff an.'),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Email Inhalt ',
      of: [
        defineArrayMember({name: 'newsletterAnnouncement', type: 'newsletterAnnouncement'}),
        defineArrayMember({name: 'newsletterShowcase', type: 'newsletterShowcase'}),
        defineArrayMember({name: 'newsletterCalendar', type: 'newsletterCalendar'}),
        defineArrayMember({name: 'newsletterDoubleFeature', type: 'newsletterDoubleFeature'}),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL-Teil',
      type: 'slug',
      options: {
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
