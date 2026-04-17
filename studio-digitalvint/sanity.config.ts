import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {StudioLogo} from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'Digitalvint — Dashboard',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || 'x6r02qtl',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: StudioLogo,
    },
  },
})
