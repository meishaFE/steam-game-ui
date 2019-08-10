/* eslint-disable */
import Vue from 'vue';
import Loading from './loading.vue';
import { addClass, removeClass, getStyle } from 'src/utils/dom';
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    let parent = binding.modifiers.fullscreen ? document.body : el;
    if (binding.value) {
      Vue.nextTick(() => {
        let wrapPosition = getStyle(parent, 'position');
        if (wrapPosition != 'absolute' && wrapPosition !== 'fixed') {
          addClass(parent, 'st-loading-parent--relative');
        }
        const maskStyle = {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
        Object.keys(maskStyle).forEach(property => {
          el.mask.style[property] = maskStyle[property];
        });
        el.maskStyle = maskStyle;
        el.instance.visible = true;
        parent.appendChild(el.mask);
      })
    } else {
      removeClass(parent, 'st-loading-parent--relative');
      removeClass(parent, 'st-loading-parent--hidden');
      el.instance.visible = false;
    }
  }
  Vue.directive('stloading', {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute('st-loading-text');
      const spinnerExr = el.getAttribute('st-loading-spinner');
      const backgroundExr = el.getAttribute('st-loading-background');
      const customClassExr = el.getAttribute('st-loading-custom-class');
      const vm = vnode.context;
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
        }
      })
      el.instance = mask;
      el.mask = mask.$el;
      binding.value && toggleLoading(el, binding);
    },

    update: function(el, binding) {
      el.instance.setText(el.getAttribute('st-loading-text'));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance && el.instance.$destroy();
    }
  });
};
export default loadingDirective;
