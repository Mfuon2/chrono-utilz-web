import Home from '../views/Home.vue'
import CoreOperations from '../views/CoreOperations.vue'
import BusinessUtilities from '../views/BusinessUtilities.vue'
import FormattingParsing from '../views/FormattingParsing.vue'
import TimezoneLocalization from '../views/TimezoneLocalization.vue'
import ComparisonValidation from '../views/ComparisonValidation.vue'
import UtilityFunctions from '../views/UtilityFunctions.vue'
import Documentation from '../views/Documentation.vue'
import APIDocs from '../views/APIDocs.vue'
import Roadmap from '../views/Roadmap.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/core-operations',
    name: 'CoreOperations',
    component: CoreOperations
  },
  {
    path: '/business-utilities',
    name: 'BusinessUtilities',
    component: BusinessUtilities
  },
  {
    path: '/formatting-parsing',
    name: 'FormattingParsing',
    component: FormattingParsing
  },
  {
    path: '/timezone-localization',
    name: 'TimezoneLocalization',
    component: TimezoneLocalization
  },
  {
    path: '/comparison-validation',
    name: 'ComparisonValidation',
    component: ComparisonValidation
  },
  {
    path: '/utility-functions',
    name: 'UtilityFunctions',
    component: UtilityFunctions
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation
  },
  {
    path: '/api-docs',
    name: 'APIDocs',
    component: APIDocs
  },  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]