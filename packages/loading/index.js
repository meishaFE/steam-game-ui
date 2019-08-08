import directive from './directive';
import service from './service';

export default {
  install(Vue) {
    Vue.use(directive);
  },
  directive,
  service
};
