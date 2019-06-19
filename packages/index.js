import Button from 'packages/button/index.js';
import Icon from 'packages/icon/index.js';
import 'src/style/icon.scss';

const components = [
  Button,
  Icon
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
  Button
};
