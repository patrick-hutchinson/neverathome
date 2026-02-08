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
    defineField({name: 'headerLabel', title: 'Header Label', type: 'string'}),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'useHoverEffect',
      title: 'Hover Effekt',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{type: 'highlightType'}],
      validation: (Rule) => Rule.required().error('A type is required'),
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
