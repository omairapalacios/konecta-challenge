import Vue from 'vue';
import Router from 'vuew-router';

import Login from '@components/Login';

Vue.use(Router);


export default new Router({
  routes:[
    {
      path:'/',
      name: 'Login',
      component: Login
    }
  ]
})

