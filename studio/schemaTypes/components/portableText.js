import {defineType, defineArrayMember} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Rich Text',
  type: 'array',
  of: [
    // ---- TEXT BLOCK ----
    defineArrayMember({
      type: 'block',
      styles: [
        // {title: 'Normal', value: 'normal'},
        // {title: 'H2', value: 'h2'},
        // {title: 'H3', value: 'h3'},
        // {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          //   {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'link',
          },
        ],
      },
    }),
  ],
})
