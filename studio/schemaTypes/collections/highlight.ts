import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'
import type {ValidationContext} from 'sanity'

import {SparkleIcon} from '@sanity/icons'

export const highlight = defineType({
  name: 'highlight',
  title: 'Highlights',
  icon: SparkleIcon,
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
      type: 'reference',
      to: [{type: 'highlightType'}],
      validation: (Rule) => Rule.required().error('A type is required'),
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
      media: 'thumbnail.image',
      tag: 'tag.title', // or 'tag.slug.current' if available
    },
    prepare({title, media, tag}) {
      return {
        title,
        subtitle: tag, // cleaner nullish fallback
        media,
      }
    },
  },
})
