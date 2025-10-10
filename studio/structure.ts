import type {StructureResolver} from 'sanity/structure'
import {MasterDetailIcon} from '@sanity/icons'
import {DashboardIcon} from '@sanity/icons'
import {CalendarIcon} from '@sanity/icons'
import {PinFilledIcon} from '@sanity/icons'

// Define singleton document IDs here
const singletons = ['site', 'home', 'contact', 'events', 'workshops', 'studios', 'imprint']

// Add other types you want to hide from Desk here
const hiddenTypes = [...singletons, 'mux.videoAsset']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Top-level singleton
      S.listItem()
        .title('Site')
        .icon(DashboardIcon)
        .child(S.document().schemaType('site').documentId('site')),

      // Pages folder
      S.listItem()
        .title('Pages')
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.document().schemaType('home').documentId('home')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('contact').documentId('contact')),
              S.listItem()
                .title('Events Page')
                .child(S.document().schemaType('events').documentId('events')),
              S.listItem()
                .title('Workshops Page')
                .child(S.document().schemaType('workshops').documentId('workshops')),
              S.listItem()
                .title('Studios Page')
                .child(S.document().schemaType('studios').documentId('studios')),
              S.listItem()
                .title('Imprint Page')
                .child(S.document().schemaType('imprint').documentId('imprint')),
            ]),
        ),

      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Pinned')
                .icon(PinFilledIcon)
                .child(
                  S.documentTypeList('event').title('Pinned').filter('_type == "event" && pinned'),
                ),
              S.listItem()
                .title('Current / Upcoming')
                .child(
                  S.documentTypeList('event')
                    .title('Current / Upcoming')
                    .filter('_type == "event" && (coalesce(endDate, startDate) >= now())')
                    .defaultOrdering([{field: 'startDate', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Past')
                .child(
                  S.documentTypeList('event')
                    .title('Past Events')
                    .filter('_type == "event" && coalesce(endDate, startDate) < now()')
                    .defaultOrdering([{field: 'startDate', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentTypeList('event')
                    .title('Drafts / Undated')
                    .filter('_type == "event" && !defined(startDate) && !defined(endDate)')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
                ),
            ]),
        ),

      // Everything else (exclude hidden types and the ones we added above)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !hiddenTypes.includes(listItem.getId()!) &&
          !['eventType', 'colorPair', 'venue', 'speaker', 'event'].includes(listItem.getId()!),
      ),

      // Definitions folder
      S.listItem()
        .title('Definitions')
        .child(
          S.list()
            .title('Definitions')
            .items([
              S.listItem()
                .title('Event Types')
                .schemaType('eventType')
                .child(S.documentTypeList('eventType').title('Event Types')),
              S.listItem()
                .title('Color Pairs')
                .schemaType('colorPair')
                .child(S.documentTypeList('colorPair').title('Color Pair')),
            ]),
        ),
    ])
