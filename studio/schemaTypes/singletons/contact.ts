import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Team Image',
      type: 'image',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Name', type: 'string'},
            {name: 'role', title: 'Role', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Permanent Staff', value: 'permanentStaff'},
                  {title: 'Temporary Staff', value: 'temporaryStaff'},
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About Page'}),
  },
})
