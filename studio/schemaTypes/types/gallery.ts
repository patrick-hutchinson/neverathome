import {defineType, defineField} from 'sanity'

export const gallery = defineField({
  name: 'gallery',
  title: 'Image & Video Gallery',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {name: 'image', type: 'image', hidden: ({parent}) => !!parent?.video},
        {name: 'video', type: 'mux.video', hidden: ({parent}) => !!parent?.image},
      ],
      preview: {
        select: {
          image: 'image',
          video: 'video',
        },
        prepare({image, video}) {
          return {
            title: image ? 'Image' : 'Video',
            media: image || video,
          }
        },
      },
    },
  ],
  options: {
    layout: 'grid',
  },
})
