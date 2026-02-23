import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'exportNewsletter',
      event: {
        on: ['create', 'update'],
        filter: "_type=='newsletter'",
        projection: '{_id, slug, title, subject}',
      },
    }),
  ],
})
