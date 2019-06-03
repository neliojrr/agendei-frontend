import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Prospect from './views/Prospect.vue';
import Thanks from './views/Thanks.vue';
import Login from './views/Login.vue';
import Agenda from './views/Agenda.vue';
import Staff from './views/Staff.vue';
import Clients from './views/Clients.vue';
import ClientView from './views/ClientView.vue';
import NotFound from './views/NotFound.vue';
import Sales from './views/Sales.vue';
import Services from './views/Services.vue';
import Products from './views/Products.vue';
import Packages from './views/Packages.vue';
import PackageView from './views/PackageView.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contato',
      name: 'prospect',
      component: Prospect,
      props: { default: true, title: 'Prospect' },
    },
    {
      path: '/obrigado',
      name: 'thanks',
      component: Thanks,
      props: { default: true, title: 'Thank you' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      props: { default: true, title: 'SignUp' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { default: true, pageTitle: 'Login' },
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: Agenda,
      props: { pageTitle: 'Agenda' },
      meta: { loadData: true },
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      props: { pageTitle: 'Profissionais' },
      meta: { loadData: true },
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      props: { pageTitle: 'Clientes' },
      meta: { loadData: true },
    },
    {
      path: '/clients/:id',
      name: 'clientView',
      component: ClientView,
      props: { pageTitle: 'Cliente' },
      meta: { loadData: true },
    },
    {
      path: '/sales',
      name: 'sales',
      component: Sales,
      props: { pageTitle: 'Vendas' },
      meta: { loadData: true },
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
      props: { pageTitle: 'Serviços' },
      meta: { loadData: true },
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      props: { pageTitle: 'Produtos' },
      meta: { loadData: true },
    },
    {
      path: '/packages',
      name: 'packages',
      component: Packages,
      props: { pageTitle: 'Pacotes' },
      meta: { loadData: true },
    },
    {
      path: '/packages/:id',
      name: 'package',
      component: PackageView,
      props: { pageTitle: 'Pacote' },
      meta: { loadData: true },
    },

    /* not found */
    {
      path: '/*',
      name: 'not-found',
      component: NotFound,
      props: { pageTitle: 'Not found' },
    },
  ],
});

let firstTimeLoading = true;
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const salon = JSON.parse(window.localStorage.getItem('salon')) || {};
  const loadData = to.matched.some(record => record.meta.loadData);
  if (firstTimeLoading && user.id && salon.id && loadData) {
    store.dispatch('service/getServiceCategories', { salon });
    store.dispatch('product/getProductCategories', { salon });
    firstTimeLoading = false;
  }
  next();
});

export default router;
