import {type SchemaTypeDefinition} from 'sanity'

// Singletons
import {site} from './site'
import {home} from './singletons/home'
import {contact} from './singletons/contact'
import {events} from './singletons/events'
import {workshops} from './singletons/workshops'
import {studios} from './singletons/studios'
import {imprint} from './singletons/imprint'

// Collections
import {event} from './collections/event'
import {highlight} from './collections/highlight'
import {feature} from './collections/feature'
import {location} from './collections/location'
import {artist} from './collections/artist'
import {studio} from './collections/studio'

// Definitions
import {eventType} from './definitions/eventType'

// Object types
import {thumbnail} from './types/thumbnail'
import {colorPair} from './types/colorPair'
import {gallery} from './types/gallery'
import {imageWithMetadata} from './types/imageWithMetadata'
import {videoWithMetadata} from './types/videoWithMetadata'
import {medium} from './types/medium'

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
    studios,
    studio,
    gallery,
    imprint,
    imageWithMetadata,
    videoWithMetadata,
    medium,
  ],
}
