import create from '../utils/create.js';

export const emitter = create.emitter;

const initialTodoData = {
  todo: {
    ids: [],
    items: {},
    unFinishedCount: 0,
  },
  log: {
    dateSort: [],
    items: {}
  },
  setting:{
    allowCheckAll: true,
    allowClearAll: true,
    showLogTime: false
  }
}

const todoData = wx.getStorageSync('todo') || initialTodoData

export const store = {
  data: todoData,
  debug: false
}
