import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/evie/sass/style.scss';

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'pt-br',
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
