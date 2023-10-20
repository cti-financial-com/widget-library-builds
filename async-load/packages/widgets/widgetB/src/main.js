import '@dory/fe-components/src/scss/dory-components.scss';
import WidgetB from './api';

const widget = new WidgetB().mountApp('#app');
window.widget = widget;
