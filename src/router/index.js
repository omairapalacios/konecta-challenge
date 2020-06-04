import Vue from 'vue';
import Router from 'vue-router';

import Login from '../components/Login';
import Home from '../components/Home';

import firebase from 'firebase';

Vue.use(Router);

/* rutas */
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        reqAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let reqAuth = to.matched.some((record) => record.meta.reqAuth);

  if (reqAuth && !user) {
    next('login');
  } else if (!reqAuth && user) {
    next('home');
  } else {
    next();
  }
});

export default router;
