import '@dory/fe-components/src/scss/dory-components.scss';
import WidgetA from './api';

const widget = new WidgetA().mountApp('#app');
window.widget = widget;
