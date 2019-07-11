import 'buefy/dist/buefy.css';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Buefy from 'buefy';
import VueAnalytics from 'vue-analytics';
import VTooltip from 'v-tooltip';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarAlt,
  faUsers,
  faUsersCog,
  faCut,
  faSprayCan,
  faFileInvoiceDollar,
  faSignOutAlt,
  faUser,
  faUserCircle,
  faPlus,
  faMinus,
  faCheck,
  faSearch,
  faBox,
  faEnvelope,
  faArrowRight,
  faArrowLeft,
  faClipboardList,
  faStore,
  faCog,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faDollarSign,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import dinero from './mixins/dinero';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

/* Icons used */
library.add(
  faCalendarAlt,
  faUsers,
  faUsersCog,
  faSprayCan,
  faFileInvoiceDollar,
  faCut,
  faUser,
  faUserCircle,
  faSignOutAlt,
  faPlus,
  faCheck,
  faSearch,
  faBox,
  faEnvelope,
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
  faArrowLeft,
  faArrowRight,
  faMinus,
  faClipboardList,
  faStore,
  faCog,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faDollarSign,
  faEdit,
  faTrashAlt,
);
/* end icons */

Vue.mixin(dinero);

Vue.component('font-awesome-icon', FontAwesomeIcon);
dom.watch();

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fa',
});
Vue.use(VueAnalytics, {
  id: 'UA-36204274-9',
  router,
});
Vue.use(VTooltip);
VTooltip.enabled = window.innerWidth > 768;

const i18n = new VueI18n({
  locale: 'pt-br',
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
