import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import button from 'packages/button/docs/index.md';
import icon from 'packages/icon/docs/index.md';
import loading from 'packages/loading/docs/index.md';
import message from 'packages/message/docs/index.md';
import clickoutside from 'packages/clickoutside/docs/index.md';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        name: 'Button',
        path: '/button',
        component: button
      }, {
        name: 'Icon',
        path: '/icon',
        component: icon
      }, {
        name: 'Loading',
        path: '/loading',
        component: loading
      }, {
        name: 'Message',
        path: '/message',
        component: message
      }, {
        name: 'Clickoutside',
        path: '/clickoutside',
        component: clickoutside
      }]
    }
  ]
});
