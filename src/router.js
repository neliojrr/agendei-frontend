import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Calendar from './views/Calendar.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
      props: { default: true, title: 'Login' },
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
      path: '/signup',
      name: 'signup',
      component: Signup,
      props: { default: true, title: 'SignUp' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { default: true, title: 'Login' },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      props: { title: 'Calendário' },
    },
  ],
});
