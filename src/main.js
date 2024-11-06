import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import de Vuetify et du style CSS de base
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

// Configuration de Vuetify
Vue.use(Vuetify);

Vue.config.productionTip = false;

// Initialisation de l'instance de Vuetify
const vuetify = new Vuetify();

new Vue({
  router,
  vuetify, // Ajout de Vuetify à l'instance Vue
  render: h => h(App)
}).$mount('#app');
