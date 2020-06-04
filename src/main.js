import Vue from 'vue';
import App from './App.vue';
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false;
require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyBcHkSDWiSOr26A203Pa_3x3_GNzM6iO3o',
  authDomain: 'konectameet.firebaseapp.com',
  databaseURL: 'https://konectameet.firebaseio.com',
  projectId: 'konectameet',
  storageBucket: 'konectameet.appspot.com',
  messagingSenderId: '961837794065',
  appId: '1:961837794065:web:83c4c9ed6d5cbe75bfc2b0',
  measurementId: 'G-R8KBYVKLCY',
};

// Initialize Firebase
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    vuetify,
    firebase,
    router,
    render: (h) => h(App),
  }).$mount('#app');
});
