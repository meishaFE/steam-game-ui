import Vue from 'vue';
import Main from './message.vue';

let MessageConstructor = Vue.extend(Main);

let instance;

const Message = function (options = {}) {
  instance = new MessageConstructor({
    data: options
  });
  document.body.appendChild(instance.$mount().$el);
  return instance;
};

['success', 'error', 'loading'].forEach(type => {
  Message[type] = options => {
    options.type = type;
    return Message(options);
  };
});

export default Message;
