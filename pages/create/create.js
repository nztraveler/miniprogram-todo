import create from '../../utils/create.js';
import { store } from '../../store/store.js';
import { createTodo } from '../../store/action/index.js';

create(store, {
  onSubmit(e) {
    const value = e.detail.value;
    if (!value.content) {
      wx.showToast({
        title: '请填写代办内容',
        icon: 'none'
      })
      return;
    }
    createTodo(value);
    wx.switchTab({
      url: '/pages/index/index',
    });

  },
})