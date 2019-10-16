import actionList from './todo.js';
import { store } from '../store.js';
export { createTodo } from './todo.js';
export { deleteOneLog } from './log.js'

export function updateStorage() {
  wx.setStorage({
    key: 'todo',
    data: store.data,
    success: (result) => {
    },
    fail: () => { },
    complete: () => { }
  });
}
export default actionList;