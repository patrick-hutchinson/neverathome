import type {StructureResolver} from 'sanity/structure'

// Define singleton document IDs here
const singletons = ['site', 'home', 'contact', 'events', 'workshops']

// Add other types you want to hide from Desk here
const hiddenTypes = [...singletons, 'mux.videoAsset']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem().title('Site').child(S.document().schemaType('site').documentId('site')),
      S.listItem().title('Home').child(S.document().schemaType('home').documentId('home')),
      S.listItem().title('Contact').child(S.document().schemaType('contact').documentId('contact')),
      S.listItem().title('Events').child(S.document().schemaType('events').documentId('events')),
      S.listItem()
        .title('Workshops')
        .child(S.document().schemaType('workshops').documentId('workshops')),

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
            ]),
        ),

      // Everything else (exclude hidden types and the ones we added above)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !hiddenTypes.includes(listItem.getId()!) &&
          !['eventType', 'venue', 'speaker'].includes(listItem.getId()!),
      ),
    ])
