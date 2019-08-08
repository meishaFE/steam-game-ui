import Vue from 'vue';
import loadingVue from './loading.vue';

const LoadingConstructor = Vue.extend(loadingVue);

const defaultOptions = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ''
};

const Loading = (options = {}) => {
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: Object.assign({}, defaultOptions, options)
  });
  return instance;
};

export default Loading;
