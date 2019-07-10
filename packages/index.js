import Button from 'packages/button/index.js';
import Icon from 'packages/icon/index.js';
import Loading from 'packages/loading/index.js';
import Message from 'packages/message/index.js';
import Clickoutside from 'packages/clickoutside/index.js';

import 'src/style/icon.scss';

const components = [
  Button,
  Icon
];

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.use(Loading.directive);
  Vue.directive('clickoutside', Clickoutside);
  Vue.prototype.$message = Message;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.0',
  install,
  Button,
  Loading,
  Message
};
