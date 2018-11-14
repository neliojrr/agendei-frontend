import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Prospect from './views/Prospect.vue';
import Thanks from './views/Thanks.vue';
import Login from './views/Login.vue';
import Calendar from './views/Calendar.vue';
import Staff from './views/Staff.vue';
import Clients from './views/Clients.vue';
import ClientView from './views/ClientView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
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
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      props: { pageTitle: 'Calendário' },
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
  ],
});
