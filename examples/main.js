import Vue from 'vue';
import SteamUI from 'packages/index.js';
import App from './App.vue';
import router from './router';
import 'highlight.js/styles/atom-one-dark.css';
import codeBlock from './views/codeBlock.vue';

Vue.use(SteamUI);
Vue.component('code-block', codeBlock);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
