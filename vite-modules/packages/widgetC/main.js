import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { createI18n } from 'vue-i18n-bridge';

// Libraries
import DoryComponents from '@dory/fe-components';
import enUSComponents from '@dory/fe-components/src/i18n/en-US';
import deDEComponents from '@dory/fe-components/src/i18n/de-DE';
import '@dory/fe-components/src/scss/dory-components.scss';

import DoryFidlets from '@dory/fe-fidlet';
import numberFormats from './src/locales/numberFormats.json';
import datetimeFormats from './src/locales/datetimeFormats.json';

import App from './src/WidgetC.vue';

import enUS from './src/locales/en-US.json';
import deDE from './src/locales/de-DE.json';

Vue.use(DoryComponents);
Vue.use(DoryFidlets);
Vue.use(VueI18n, { bridge: true });

const i18n = createI18n(
  {
    legacy: false,
    locale: 'en-US',
    messages: {
      'en-US': {
        ...enUSComponents,
        ...enUS,
      },
      'de-DE': {
        ...deDEComponents,
        ...deDE,
      },
    },
    numberFormats,
    datetimeFormats,
  },
  VueI18n
);
Vue.use(i18n);

const app = new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');

export { app };