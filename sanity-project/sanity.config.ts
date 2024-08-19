import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ComposeIcon, CodeIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './presentation/resolve'

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig([
  {
    name: 'editorial',
    basePath: '/editorial',
    title: 'Editorial mode',
    icon: ComposeIcon,
    projectId: '3ymzfu0d',
    dataset: 'production-import',
    plugins: [
      structureTool(),
      presentationTool({
        previewUrl: {
          preview: SANITY_STUDIO_PREVIEW_URL,
          draftMode: {
            enable: SANITY_STUDIO_PREVIEW_URL + '/api/draft-mode/enable',
          },
        },
        resolve,
      }),
    ],
    schema: {types: schemaTypes},
  },
  {
    name: 'coding',
    basePath: '/',
    title: 'Coding mode',
    icon: CodeIcon,
    projectId: '3ymzfu0d',
    dataset: 'production-import',

    plugins: [
      structureTool({
        structure,
        defaultDocumentNode,
      }),
      visionTool(),
      unsplashImageAsset(),
    ],

    tools: (prev, {currentUser}) => {
      const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

      if (isAdmin) {
        return prev
      }

      return prev.filter((tools) => tools.name !== 'vision')
    },

    schema: {
      types: schemaTypes,
    },
  },
])
