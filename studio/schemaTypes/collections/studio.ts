import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'

export const studio = defineType({
  name: 'studio',
  title: 'Studios',
  type: 'document',

  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Shared Studio', value: 'sharedStudio'},
          {title: 'Artist Studio', value: 'artistStudio'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail.image',
      type: 'type',
    },
    prepare({title, media, type}: {title?: string; media?: any; type?: string}) {
      const types: Record<string, string> = {
        sharedStudio: 'Shared Studio',
        artistStudio: 'Artist Studio',
      }

      return {
        title,
        subtitle: types[type ?? ''] || '',
        media,
      }
    },
  },
})
