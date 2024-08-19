import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '3ymzfu0d',
  dataset: 'production-import',
  perspective: 'raw',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-08-19',
})
