import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { createI18n } from 'vue-i18n-bridge';

// Libraries
import DoryComponents from '@dory/fe-components';
import enUSComponents from '@dory/fe-components/src/i18n/en-US';
import deDEComponents from '@dory/fe-components/src/i18n/de-DE';

import DoryFidlets from '@dory/fe-fidlet';
import numberFormats from './locales/numberFormats.json';
import datetimeFormats from './locales/datetimeFormats.json';

import App from './WidgetA.vue';

import enUS from './locales/en-US.json';
import deDE from './locales/de-DE.json';

export default class WidgetA {
  constructor(locale = 'en-US', fallbackLocale = undefined) {
    Vue.use(DoryComponents);
    Vue.use(DoryFidlets);
    Vue.use(VueI18n, { bridge: true });

    const i18n = createI18n(
      {
        legacy: false,
        locale,
        fallbackLocale: fallbackLocale || locale,
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

    this.app = new Vue({
      render: (h) => h(App),
    });

    // return Widget instance
    return this;
  }

  mountApp(selector) {
    this.app.$mount(selector);

    return this;
  }

  destroyApp(destroyDOM = true) {
    this.app.$destroy();
    if (destroyDOM) {
      this.app.$el.remove();
    }
    this.app = null;

    return this;
  }

  // Widget API
  changeLocale(locale) {
    this.app.$i18n.locale = locale;

    return this;
  }
}
