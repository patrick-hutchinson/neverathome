import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || '503pb0j3'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN
const shouldExecute = process.argv.includes('--execute')

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN (or SANITY_API_TOKEN).')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-02-24',
  token,
  useCdn: false,
})

const docs = await client.fetch(`*[_type == "events"]{_id, _rev}`)

if (!docs.length) {
  console.log('No documents with _type "events" found. Nothing to migrate.')
  process.exit(0)
}

console.log(`Found ${docs.length} document(s) to migrate from "events" to "programming".`)

if (!shouldExecute) {
  console.log('Dry run only. No writes performed. Re-run with --execute to apply migration.')
  process.exit(0)
}

const tx = client.transaction()
for (const doc of docs) {
  tx.patch(doc._id, {
    ifRevisionID: doc._rev,
    set: {_type: 'programming'},
  })
}

await tx.commit()
console.log('Migration completed successfully.')
