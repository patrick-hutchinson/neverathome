import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'
import {gallery} from '../types/gallery'
import type {ValidationContext} from 'sanity'
import {MarkerIcon} from '@sanity/icons'

export const location = defineType({
  name: 'location',
  title: 'Locations',
  icon: MarkerIcon,
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'address', title: 'Location', type: 'string'}),
    defineField({name: 'info', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'currentLocation',
      title: 'Current Location',
      type: 'boolean',
      description: 'Is this the location where you are currently based?',
    }),
    gallery,
    defineField({
      name: 'moveInDate',
      title: 'Move In Date',
      type: 'datetime',
    }),
    defineField({
      name: 'moveOutDate',
      title: 'Move Out Date',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((moveOutDate, context: ValidationContext) => {
          const moveInDate = (context.parent as {moveInDate?: string})?.moveInDate
          if (moveOutDate && moveInDate && moveOutDate < moveInDate) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'colorPair',
      title: 'Selected Color Pair',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'colorPair'}]}],
      validation: (Rule) => Rule.max(1).error('You can only select one highlight'),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Teil',
      type: 'slug',
      description:
        'Ein Beispiel: 👉 wwww.neverathome.com/mein-artikel ("mein-artikel" ist URL-Teil)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
