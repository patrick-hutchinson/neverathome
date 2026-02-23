import {defineField, defineType} from 'sanity'
import {gallery} from '../types/gallery'

export const contact = defineType({
  name: 'contact',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'page', type: 'reference', to: [{type: 'page'}], title: 'Page'}),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'doubleFeature_team',
      title: 'Doppel Modul',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Team Image',
          type: 'image',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'colorPair',
          title: 'Farbkombination',
          type: 'reference',
          to: {type: 'colorPair'},
        }),
      ],
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
                  {title: 'Core Team', value: 'permanentStaff'},
                  {title: 'Extended', value: 'temporaryStaff'},
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'doubleFeature_supporter',
      title: 'Doppel Modul',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Team Image',
          type: 'image',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'colorPair',
          title: 'Farbkombination',
          type: 'reference',
          to: {type: 'colorPair'},
        }),
      ],
    }),
    defineField({
      name: 'supportAccordions',
      title: 'Support Accordion Entries',
      type: 'array',
      of: [
        defineField({
          name: 'supportAccordionEntry',
          title: 'Support Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'columnOne',
              title: 'Column 1',
              type: 'string',
              description: 'Examples: "Support Options", "Main Supporters"',
            }),
            defineField({
              name: 'columnTwo',
              title: 'Column 2',
              type: 'string',
              description: 'Examples: Year, Year Range',
            }),
            defineField({
              name: 'columnThree',
              title: 'Column 3',
              type: 'string',
              description: 'Main header text',
            }),
            defineField({
              name: 'columnFour',
              title: 'Column 4',
              type: 'string',
              description: 'Examples: "FAQ", supporter count',
            }),
            defineField({
              name: 'info',
              title: 'Expanded Content',
              type: 'array',
              of: [{type: 'block'}],
            }),
            gallery,
          ],
          preview: {
            select: {
              title: 'columnThree',
              subtitle: 'columnOne',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Support Entry',
                subtitle: subtitle || 'Support Accordion',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About Page'}),
  },
})
