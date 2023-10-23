import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { merge } from 'lodash-es';

// Libraries
import enUSComponents from '@dory/fe-components/src/i18n/en-US';
import deDEComponents from '@dory/fe-components/src/i18n/de-DE';

import DoryFidlets, {
  enUS as enUSFidlets,
  deDE as deDEFidlets,
} from '@dory/fe-fidlet';

export class WidgetApiBase {
  constructor(widget, messages, vueI18n = {}) {
    const locale = vueI18n.locale ?? 'en-US';
    const fallbackLocale = vueI18n.fallbackLocale ?? locale;
    const { numberFormats, datetimeFormats } = vueI18n;

    Vue.use(DoryFidlets);
    Vue.use(VueI18n);

    const i18n = new VueI18n({
      locale,
      fallbackLocale,
      // create messages object by flat merging default dory messages with the provided widget messages
      messages: Object.keys(messages).reduce((acc, key) => {
        if (key === 'en-US') {
          acc[key] = {
            ...enUSComponents,
            ...enUSFidlets.messages,
            ...messages[key],
          };
        } else if (key === 'de-DE') {
          acc[key] = {
            ...deDEComponents,
            ...deDEFidlets.messages,
            ...messages[key],
          };
        } else {
          console.log(acc, key, messages);
          acc[key] = messages[key];
        }
        return acc;
      }, {}),
      // create numberFormats object by deep merging default dory numberFormats with the provided
      // widget numberFormats
      numberFormats: merge(
        {
          'en-US': enUSFidlets.numberFormats,
          'de-DE': deDEFidlets.numberFormats,
        },
        numberFormats
      ),
      // create datetimeFormats object by deep merging default dory numberFormats with the provided
      // widget datetimeFormats
      datetimeFormats: merge(
        {
          'en-US': enUSFidlets.datetimeFormats,
          'de-DE': deDEFidlets.datetimeFormats,
        },
        datetimeFormats
      ),
    });
    this.app = new Vue({
      i18n,
      render: (h) => h(widget),
    });

    // return Widget instance
    return this;
  }

  // Vue API
  mountApp(selector) {
    console.log('mountApp', selector, this.app);
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
