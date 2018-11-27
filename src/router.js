import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Calendar from './views/Calendar.vue';
import Staff from './views/Staff.vue';
import Clients from './views/Clients.vue';
import ClientView from './views/ClientView.vue';
import Sales from './views/Sales.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      props: { default: true, title: 'About' },
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
      component: Calendar,
      props: { pageTitle: 'Agenda' },
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      props: { pageTitle: 'Profissionais' },
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      props: { pageTitle: 'Clientes' },
    },
    {
      path: '/clients/:id',
      name: 'clientView',
      component: ClientView,
      props: { pageTitle: 'Cliente' },
    },
    {
      path: '/sales',
      name: 'sales',
      component: Sales,
      props: { pageTitle: 'Vendas' },
    },
  ],
});
