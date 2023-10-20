import Vue from 'vue';

import { WidgetApiBase } from '@dory/internal-common/lib/apiBase.js';
import error from '@dory/internal-common/lib/error.vue';
import { VSkeletonLoader } from '@dory/fe-components';

import enUS from './locales/en-US.json';
import deDE from './locales/de-DE.json';

export default class WidgetB extends WidgetApiBase {
  constructor(locale = 'en-US', fallbackLocale = undefined) {
    const component = Vue.component('widget-b', () => ({
      component: import('./WidgetB.vue'),
      loading: VSkeletonLoader,
      error,
      timeout: 3000,
    }));

    super(
      component,
      { 'en-US': enUS, 'de-DE': deDE },
      {
        locale,
        fallbackLocale,
      }
    );
  }
}
