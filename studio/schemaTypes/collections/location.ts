import {defineField, defineType} from 'sanity'
import {thumbnail} from '../types/thumbnail'
import {gallery} from '../types/gallery'
import type {ValidationContext} from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'address', title: 'Location', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
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
  ],
})
