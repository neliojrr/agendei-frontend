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
import Report from './views/Report.vue';
import Services from './views/Services.vue';
import Products from './views/Products.vue';
import Packages from './views/Packages.vue';
import PackageView from './views/PackageView.vue';
import Sales from './views/Sales.vue';
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
      props: { title: 'Prospect' },
    },
    {
      path: '/obrigado',
      name: 'thanks',
      component: Thanks,
      props: { title: 'Thank you' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      props: { title: 'SignUp' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { pageTitle: 'Login' },
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
      props: route => ({ id: Number(route.params.id), pageTitle: 'Cliente' }),
      meta: { loadData: true },
    },
    {
      path: '/reports',
      name: 'reports',
      component: Report,
      props: { pageTitle: 'Relatórios' },
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
    {
      path: '/sales',
      name: 'sales',
      component: Sales,
      props: route => ({
        openSelectItem: route.params.openSelectItem || false,
        appointment: route.params.appointment || {},
        pageTitle: 'Vendas',
      }),
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
    store.commit('addSalon', salon);
    store.commit('addUser', user);
    store.dispatch('service/getServiceCategories', { salon });
    store.dispatch('product/getProductCategories', { salon });
    store.dispatch('employee/getEmployees', { salon });
    store.dispatch('client/getClients', { salon });
    firstTimeLoading = false;
  }
  next();
});

export default router;
