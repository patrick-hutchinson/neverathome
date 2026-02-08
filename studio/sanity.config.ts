import {defineConfig} from 'sanity'

import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {muxInput} from 'sanity-plugin-mux-input'
import {linkField} from 'sanity-plugin-link-field'

import {simplerColorInput} from 'sanity-plugin-simpler-color-input'

import {structure} from './structure'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'never-at-home-studio',

  projectId: '503pb0j3',
  dataset: 'production',

  schema,

  plugins: [
    structureTool({structure}),
    visionTool(),
    muxInput(),
    linkField(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'hex',
      enableSearch: true,
    }),
  ],
})
