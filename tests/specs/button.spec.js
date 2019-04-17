import { shallowMount } from '@vue/test-utils';
import Button from 'packages/button/Button.vue';

describe('default button', () => {
  it('default button', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.contains('button')).toBeTruthy();
    expect(wrapper.contains('.st-button')).toBeTruthy();
    expect(wrapper.contains('.st-button--default')).toBeTruthy();
  });

  it('click', () => {
    const wrapper = shallowMount(Button);
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('slots text', () => {
    const btnStr = '按钮';
    const wrapper = shallowMount(Button, {
      slots: {
        default: btnStr
      }
    });
    expect(wrapper.find('span').text()).toBe(btnStr);
  });

  it('primary button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'primary'
      }
    });
    expect(wrapper.contains('.st-button--primary')).toBeTruthy();
  });

  it('medium size', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'medium'
      }
    });
    expect(wrapper.contains('.st-button--medium')).toBeTruthy();
  });

  it('small size', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'small'
      }
    });
    expect(wrapper.contains('.st-button--small')).toBeTruthy();
  });

  it('mini size', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'mini'
      }
    });
    expect(wrapper.contains('.st-button--mini')).toBeTruthy();
  });
});
