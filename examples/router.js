import Vue from 'vue';
import navConfig from './nav.config';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

let navs = [];
const componentsContext = require.context('./../packages/', true, /\.md/);
const componentsContextKeys = componentsContext.keys();
const guideContext = require.context('./../examples/', true, /\.md/);
const guideContextKeys = guideContext.keys();

Object.keys(navConfig).forEach(group => {
  navConfig[group].children.forEach(nav => {
    if (nav.path && nav.docsPath) {
      let docsPath = nav.docsPath.replace(/examples|packages/, '.');
      let isGuide = guideContextKeys.indexOf(docsPath) > -1;
      let isComponent = componentsContextKeys.indexOf(docsPath) > -1;
      if (isGuide || isComponent) {
        navs.push({
          path: nav.path,
          component: isGuide ? guideContext(docsPath).default : componentsContext(docsPath).default
        });
      }
    }
  });
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
