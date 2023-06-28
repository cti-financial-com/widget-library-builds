import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { createI18n } from 'vue-i18n-bridge';

// Libraries
// import DoryComponents from '@dory/fe-components';
// import enUSComponents from '@dory/fe-components/src/i18n/en-US';
// import deDEComponents from '@dory/fe-components/src/i18n/de-DE';

import DoryFidlets from '@dory/fe-fidlet';
import numberFormats from './locales/numberFormats.json';
import datetimeFormats from './locales/datetimeFormats.json';

import App from './WidgetA.vue';

import enUS from './locales/en-US.json';
import deDE from './locales/de-DE.json';

export default class WidgetA {
  static createI18n(locale, fallbackLocale) {
    Vue.use(VueI18n, { bridge: true });

    const i18n = createI18n(
      {
        legacy: false,
        locale,
        fallbackLocale: fallbackLocale || locale,
        messages: {
          'en-US': {
            // ...enUSComponents,
            ...enUS,
          },
          'de-DE': {
            // ...deDEComponents,
            ...deDE,
          },
        },
        numberFormats,
        datetimeFormats,
      },
      VueI18n
    );
    Vue.use(i18n);

    return i18n;
  }

  createApp(i18n = this.createI18n()) {
    // Vue.use(DoryComponents);
    Vue.use(DoryFidlets);

    this.app = new Vue({
      i18n,
      render: (h) => h(App),
    });

    return this;
  }

  mountApp(selector) {
    this.selector = selector;

    this.app.$mount(this.selector);

    return this;
  }

  destroyApp(destoryDOM = true) {
    this.app.$destroy();
    if (destoryDOM) {
      console.log(app);
      document.querySelector(this.selector).innerHTML = '';
    }
    this.app = null;

    return this;
  }
}
