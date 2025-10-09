import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'
import type {ValidationContext} from 'sanity'

export const highlight = defineType({
  name: 'highlight',
  title: 'Highlights',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((endDate, context: ValidationContext) => {
          const startDate = (context.parent as {startDate?: string})?.startDate
          if (endDate && startDate && endDate < startDate) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'link', title: 'url', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          {title: 'In The Media', value: 'inTheMedia'},
          {title: 'Visits', value: 'visits'},
          {title: 'Upcoming', value: 'upcoming'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
    }),
    defineField({
      name: 'imageIsSmall',
      title: 'Image is Small?',
      type: 'boolean',
      description: 'Mark this image if it should appear smaller on the home page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail.image', // or 'thumbnail', depending on your thumbnail type
      tag: 'tag',
    },
    prepare({
      title,
      media,
      tag,
    }: {
      title?: string
      media?: any
      tag?: 'inTheMedia' | 'visits' | 'upcoming' | string
    }) {
      const tagLabels: Record<'inTheMedia' | 'visits' | 'upcoming', string> = {
        inTheMedia: 'In The Media',
        visits: 'Visits',
        upcoming: 'Upcoming',
      }

      return {
        title,
        subtitle: tag ? tagLabels[tag as keyof typeof tagLabels] || '' : '',
        media,
      }
    },
  },
})
