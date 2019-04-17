import Header from 'packages/header/index.js';
import Button from 'packages/button/index.js';

const components = [
  Header,
  Button
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.0',
  install,
  Header,
  Button
};
