import {defineField} from 'sanity'

export const gallery = defineField({
  name: 'gallery',
  title: 'Image & Video Gallery',
  type: 'array',
  of: [{type: 'image'}, {type: 'mux.video'}],
  options: {
    layout: 'grid',
  },
})
