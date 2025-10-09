import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'

export const feature = defineType({
  name: 'feature',
  title: 'Features',

  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
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
          {title: 'Location', value: 'location'},
          {title: 'Visits', value: 'visits'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'colorPair',
      title: 'Selected Color Pair',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'colorPair'}]}],
      validation: (Rule) => Rule.max(1).error('You can only select one highlight'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
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
