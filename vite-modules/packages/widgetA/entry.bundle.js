import '@dory/fe-components/src/scss/dory-components.scss';
import WidgetApi from './src/api';

const instance = new WidgetApi();

instance.createApp(WidgetApi.createI18n('de-DE')).mountApp('#app');
window.instance = instance;
