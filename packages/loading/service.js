import Vue from 'vue';
import loadingVue from './loading.vue';
import { addClass, removeClass } from 'src/utils/dom';

const LoadingConstructor = Vue.extend(loadingVue);

LoadingConstructor.prototype.close = function() {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  const target = this.fullscreen || this.body
    ? document.body
    : this.target;
  removeClass(target, 'el-loading-parent--relative');
  removeClass(target, 'el-loading-parent--hidden');
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
  this.$destroy();
  this.visible = false;
};

const defaultOptions = {
  text: null,
  fullscreen: true,
  body: false,
  customClass: ''
};

let fullscreenLoading;

const Loading = (options = {}) => {
  options = Object.assign({}, defaultOptions, options);

  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;

  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  });

  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'st-loading-parent--relative');
  }
  parent.appendChild(instance.$el);
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export default Loading;
