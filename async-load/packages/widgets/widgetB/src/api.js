import Vue from 'vue';
import VueI18n from 'vue-i18n';

// Libraries
// import DoryComponents from '@dory/fe-components';
import enUSComponents from '@dory/fe-components/src/i18n/en-US';
import deDEComponents from '@dory/fe-components/src/i18n/de-DE';

import { VSkeletonLoader } from '@dory/fe-components';
import DoryFidlets from '@dory/fe-fidlet';
import numberFormats from './locales/numberFormats.json';
import datetimeFormats from './locales/datetimeFormats.json';

// import App from './WidgetA.vue';
import error from './error.vue';

import enUS from './locales/en-US.json';
import deDE from './locales/de-DE.json';

export default class WidgetB {
  constructor(locale = 'en-US', fallbackLocale = undefined) {
    // Vue.use(DoryComponents);
    Vue.use(DoryFidlets);
    Vue.use(VueI18n);

    Vue.component('widget-b', () => ({
      component: import('./WidgetB.vue'),
      loading: VSkeletonLoader,
      error,
      timeout: 3000,
    }));

    const i18n = new VueI18n({
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
    });
    this.app = new Vue({
      i18n,
      render: (h) => h('widget-b'),
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
