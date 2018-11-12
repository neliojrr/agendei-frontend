import 'buefy/dist/buefy.css';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Buefy from 'buefy';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarAlt,
  faUsers,
  faUsersCog,
  faCut,
  faSprayCan,
  faFileInvoiceDollar,
  faSignOutAlt,
  faUser,
  faPlus,
  faCheck,
  faSearch,
  faBox,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

/* Icons used */
library.add(faCalendarAlt);
library.add(faUsers);
library.add(faUsersCog);
library.add(faSprayCan);
library.add(faFileInvoiceDollar);
library.add(faCut);
library.add(faUser);
library.add(faSignOutAlt);
library.add(faPlus);
library.add(faCheck);
library.add(faSearch);
library.add(faBox);
library.add(faEnvelope);
/* end icons */

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

const i18n = new VueI18n({
  locale: 'pt-br',
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
