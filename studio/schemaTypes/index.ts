import {type SchemaTypeDefinition} from 'sanity'

// Singletons
import {site} from './site'
import {home} from './singletons/home'
import {contact} from './singletons/contact'
import {programming} from './singletons/programming'
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
import {pageType} from './definitions/page'
import {portableText} from './components/portableText'

// Object types
import {thumbnail} from './types/thumbnail'
import {colorPair} from './types/colorPair'
import {gallery} from './types/gallery'
import {imageWithMetadata} from './types/imageWithMetadata'
import {videoWithMetadata} from './types/videoWithMetadata'
import {medium} from './types/medium'
import {highlightType} from './definitions/highlightType'
import {link} from './types/link'

// Newsletter
import {newsletter} from './newsletter/newsletter'

import {newsletterCalendar} from './newsletter/blocks/newsletterCalendar'
import {newsletterDoubleFeature} from './newsletter/blocks/newsletterDoubleFeature'
import {newsletterAnnouncement} from './newsletter/blocks/newsletterAnnouncement'
import {newsletterShowcase} from './newsletter/blocks/newsletterShowcase'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    pageType,
    thumbnail,
    event,
    site,
    contact,
    highlight,
    eventType,
    highlightType,
    home,
    feature,
    colorPair,
    location,
    programming,
    portableText,
    link,

    artist,
    workshops,
    studios,
    studio,
    gallery,
    imprint,
    imageWithMetadata,
    videoWithMetadata,
    medium,

    // Newsletter
    newsletter,
    newsletterCalendar,
    newsletterDoubleFeature,
    newsletterAnnouncement,
    newsletterShowcase,
  ],
}
