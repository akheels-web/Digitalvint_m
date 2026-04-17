import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {StudioLogo} from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'Digitalvint — Dashboard',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || 'x6r02qtl',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    colorInput(),
    presentationTool({
      previewUrl: {
        origin: typeof location !== 'undefined' && location.origin.includes('localhost') 
          ? 'http://localhost:5173' 
          : 'https://digitalvint.com',
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: StudioLogo,
    },
  },
})
