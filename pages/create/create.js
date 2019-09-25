// pages/create/create.js
import create from '../../utils/create.js';
import {store, emitter} from '../../store/store.js';
import { createTodo } from '../../store/action.js';

create(store,{
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
    console.log(e)
  }
})

// Page({
//   onSubmit(e) {
//     const value = e.detail.value;
//     if (!value.content) {
//       wx.showToast({
//         title: '请填写代办内容',
//         icon: 'none'
//       })
//       return;
//     }
//     console.log(e)
//   }
// })