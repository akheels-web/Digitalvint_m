import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {StudioLogo} from './components/StudioLogo'
import {myTheme} from './theme'
import {LeadStatsWidget} from './components/LeadStatsWidget'

export default defineConfig({
  name: 'default',
  title: 'Digitalvint — Agency Hub',
  theme: myTheme,

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || 'x6r02qtl',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    dashboardTool({
      widgets: [
        {
          name: 'lead-stats',
          component: LeadStatsWidget,
          layout: { width: 'full' }
        },
        projectInfoWidget({
          layout: { width: 'medium' },
          data: [
            {
              title: 'Source Code',
              value: 'https://github.com/akheels-web/Digitalvint_m',
              category: 'apps'
            },
            {
              title: 'Live Website',
              value: 'https://digitalvint.com',
              category: 'deploy'
            }
          ]
        }),
        projectUsersWidget(),
      ]
    }),
    structureTool(), 
    media(),
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
