import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {SEOPreview} from './components/SEOPreview'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Uhaus',

  projectId: '0tjtv5ft',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode: (S, {schemaType}) => {
        if (schemaType === 'homepage' || schemaType === 'settings') {
          return S.document().views([
            S.view.form(),
            S.view.component(SEOPreview).title('SEO Preview'),
          ])
        }
        return S.document().views([S.view.form()])
      },
    }),
    visionTool(),
    unsplashImageAsset(),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
