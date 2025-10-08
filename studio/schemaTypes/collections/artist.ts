import {defineField, defineType} from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artists',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'occupation', title: 'Profession/Role', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
      validation: (Rule) => Rule.unique().error('You already selected this location'),
    }),
  ],
})
