import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ResetPassword from './views/ResetPassword.vue';
import Privacy from './views/Privacy.vue';
import Pricing from './views/Pricing.vue';
import Terms from './views/Terms.vue';
import Login from './views/Login.vue';
import Agenda from './views/Agenda.vue';
import Staff from './views/Staff.vue';
import Clients from './views/Clients.vue';
import ClientView from './views/ClientView.vue';
import NotFound from './views/NotFound.vue';
import Report from './views/Report.vue';
import Services from './views/Services.vue';
import Products from './views/Products.vue';
// import Packages from './views/Packages.vue';
// import PackageView from './views/PackageView.vue';
import Sales from './views/Sales.vue';
import SaleView from './views/SaleView.vue';
import Salon from './views/Salon.vue';
import MyPlan from './views/MyPlan.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cadastrar',
      name: 'signup',
      component: Signup,
      props: { title: 'Cadastrar' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { pageTitle: 'Login' }
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotPassword,
      props: { pageTitle: 'Esqueceu sua senha' }
    },
    {
      path: '/termos',
      name: 'terms',
      component: Terms,
      props: { pageTitle: 'Termos de uso' }
    },
    {
      path: '/privacidade',
      name: 'privacy',
      component: Privacy,
      props: { pageTitle: 'Política de Privacidade' }
    },
    {
      path: '/precos',
      name: 'pricing',
      component: Pricing,
      props: { pageTitle: 'Preços' }
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
      props: route => ({
        token: route.query.reset_password_token,
        pageTitle: 'Redefinir Senha'
      })
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: Agenda,
      props: { pageTitle: 'Agenda' },
      meta: { loadData: true }
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      props: { pageTitle: 'Profissionais' },
      meta: { loadData: true }
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      props: route => ({
        page: Number(route.query.page) || 1,
        pageTitle: 'Clientes'
      }),
      meta: { loadData: true }
    },
    {
      path: '/clients/:id',
      name: 'clientView',
      component: ClientView,
      props: route => ({ id: Number(route.params.id), pageTitle: 'Cliente' }),
      meta: { loadData: true }
    },
    {
      path: '/reports',
      name: 'reports',
      component: Report,
      props: route => ({
        start: route.query.start,
        end: route.query.end,
        pageTitle: 'Relatórios'
      }),
      meta: { loadData: true }
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
      props: { pageTitle: 'Serviços' },
      meta: { loadData: true }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      props: { pageTitle: 'Produtos' },
      meta: { loadData: true }
    },
    /*
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
    */
    {
      path: '/sales',
      name: 'sales',
      component: Sales,
      props: route => ({
        openSelectItem: route.params.openSelectItem || false,
        appointment: route.params.appointment || {},
        pageTitle: 'Vendas'
      }),
      meta: { loadData: true }
    },
    {
      path: '/sales/:id',
      name: 'sale',
      component: SaleView,
      props: route => ({
        id: Number(route.params.id),
        pageTitle: 'Vendas'
      }),
      meta: { loadData: true }
    },
    {
      path: '/meu-salao/pefil',
      name: 'salon',
      component: Salon,
      props: { pageTitle: 'Meu salão' },
      meta: { loadData: true }
    },
    {
      path: '/meu-salao/plano',
      name: 'salon-plan',
      component: MyPlan,
      props: { pageTitle: 'Meu Plano' },
      meta: { loadData: true }
    },

    /* not found */
    {
      path: '/*',
      name: 'not-found',
      component: NotFound,
      props: { pageTitle: 'Not found' }
    }
  ]
});

let firstTimeLoading = true;
router.beforeEach((to, from, next) => {
  if (from.name === 'login') {
    firstTimeLoading = true;
  }
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
