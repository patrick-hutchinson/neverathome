import {type SchemaTypeDefinition} from 'sanity'

// Singletons
import {site} from './site'
import {home} from './singletons/home'
import {contact} from './singletons/contact'
import {events} from './singletons/events'
import {workshops} from './singletons/workshops'

// Collections
import {event} from './collections/event'
import {highlight} from './collections/highlight'
import {feature} from './collections/feature'
import {location} from './collections/location'
import {artist} from './collections/artist'

// Definitions
import {eventType} from './definitions/eventType'

// Object types
import {thumbnail} from './types/thumbnail'
import {colorPair} from './types/colorPair'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    thumbnail,
    event,
    site,
    contact,
    highlight,
    eventType,
    home,
    feature,
    colorPair,
    location,
    events,
    artist,
    workshops,
  ],
}
