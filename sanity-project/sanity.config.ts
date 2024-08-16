import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { structure } from './structure'
import { defaultDocumentNode } from './structure/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'Day one with Sanity',

  projectId: "3ymzfu0d",
  dataset: 'production',

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }), visionTool(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
