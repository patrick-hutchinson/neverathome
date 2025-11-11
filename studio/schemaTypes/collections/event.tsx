import React from 'react'
import {useClient} from 'sanity'

import {defineField, defineType} from 'sanity'

import {gallery} from '../types/gallery'
import type {ValidationContext} from 'sanity'

import {CalendarIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('A title is required'),
    }),
    defineField({
      name: 'pinned',
      title: 'Pinned',
      type: 'boolean',
      description: 'Mark this event as pinned to highlight it.',
      components: {
        field: (props: any) => {
          const {renderDefault} = props
          const client = useClient({apiVersion: '2025-01-01'})
          const [isDisabled, setIsDisabled] = React.useState(false)
          const [reason, setReason] = React.useState('')

          React.useEffect(() => {
            if (!props.documentId) return // <-- skip for new/unsaved docs

            async function checkPinned() {
              const result = await client.fetch(
                `*[_type == "event" && pinned == true && !(_id in [$currentId, $draftId])][0]{_id, title}`,
                {
                  currentId: props.documentId,
                  draftId: `drafts.${props.documentId}`,
                },
              )
              if (result) {
                setIsDisabled(true)
                setReason(`"${result.title}" is already pinned. Please unpin it first.`)
              } else {
                setIsDisabled(false)
                setReason('')
              }
            }
            checkPinned()
          }, [client, props.documentId])

          return (
            <div>
              {renderDefault({
                ...props,
                elementProps: {
                  ...props.elementProps,
                  disabled: isDisabled,
                },
              })}
              {isDisabled && (
                <p
                  style={{
                    color: 'var(--card-muted-fg-color)',
                    fontSize: '0.875em',
                    marginTop: '0.25em',
                  }}
                >
                  {reason}
                </p>
              )}
            </div>
          )
        },
      },
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          if (!value) return true

          const client = context.getClient({apiVersion: '2025-01-01'})
          const currentId = context.document._id

          const otherPinned = await client.fetch(
            `*[_type == "event" && pinned == true && !(_id in [$currentId, $draftId])][0]{_id, title}`,
            {
              currentId,
              draftId: `drafts.${currentId}`,
            },
          )

          return otherPinned
            ? `Another event ("${otherPinned.title}") is already pinned. Please unpin it first.`
            : true
        }),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{type: 'eventType'}],
      validation: (Rule) => Rule.required().error('A type is required'),
    }),
    defineField({
      name: 'teaser',
      title: 'Einleitung',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'Dieser Text wird als Vorschau angezeigt, bevor der Kalendereintrag ausgeklappt ist.',
    }),
    defineField({name: 'info', title: 'Event Info', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((endDate, context: ValidationContext) => {
          const startDate = (context.parent as {startDate?: string})?.startDate
          if (endDate && startDate && endDate < startDate) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'string',
      description:
        "Hier Link zum Ticket Anbieter einfügen. Wenn leer, steht auf der Website 'Free Entry'",
    }),
    defineField({
      name: 'colorPair',
      title: 'Selected Color Pair',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'colorPair'}]}],
      validation: (Rule) => Rule.max(1).error('You can only select one highlight'),
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'thumbnail',
    }),
    gallery,
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
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail.image', // adjust this path to match your thumbnail type
      subtitle: 'city',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
