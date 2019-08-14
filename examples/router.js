import Vue from 'vue';
import navConfig from './nav.config';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

let navs;
const context = require.context('./../packages/', true, /\.md/);
const contextKeys = context.keys();

Object.keys(navConfig).forEach(group => {
  navs = navConfig[group].children.reduce((results, nav) => {
    if (nav.path && nav.docsPath) {
      let docsPath = nav.docsPath.replace('packages', '.');
      if (contextKeys.indexOf(docsPath) > -1) {
        results.push({
          path: nav.path,
          component: context(docsPath).default
        });
      }
    }
    return results;
  }, []);
});

let router = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: navs
    }
  ]
};

export default new Router(router);
