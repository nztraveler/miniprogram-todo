import create from '../../utils/create.js';
import {store} from '../../store/store.js';
import actionList,{createTodo} from '../../store/action.js';
const {deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished, deleteOneLog} = actionList;

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
    wx.navigateTo({
      url: '/pages/index/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  onLoad(){

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