import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'
import {gallery} from '../types/gallery'
import type {ValidationContext} from 'sanity'

import {eventType} from '../definitions/eventType'
import {CalendarIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'pinned',
      title: 'Pinned',
      type: 'boolean',
      description: 'Mark this event as pinned to highlight it.',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{type: 'eventType'}],
    }),
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
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({
      name: 'colorPair',
      title: 'Selected Color Pair',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'colorPair'}]}],
      validation: (Rule) => Rule.max(1).error('You can only select one highlight'),
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
    }),
    gallery,
    defineField({name: 'report', title: 'Report', type: 'array', of: [{type: 'block'}]}),
  ],
})
