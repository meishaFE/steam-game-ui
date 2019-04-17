import Vue from 'vue';
import SteamUI from 'packages/index.js';
import App from './App.vue';
import router from './router';

Vue.use(SteamUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
