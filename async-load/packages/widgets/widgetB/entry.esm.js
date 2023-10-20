// Import vue component
import WidgetB from './src/WidgetB.vue';

// Import languages
import deDE from './src/locales/de-DE.json';
import enUS from './src/locales/en-US.json';

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default (() => {
  // Export vue plugin
  return {
    install(Vue) {
      Vue.component('WidgetB', WidgetB);
    },
  };
})();

// Directly export components
export { deDE, enUS, WidgetB };
