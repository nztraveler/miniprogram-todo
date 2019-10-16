import { emitter, store } from '../store.js';
import { getFormatDate, getDateOrder, createID } from '../../utils/util.js';
import { createLog } from './log.js';
import { updateStorage } from './index.js'

const { todo } = store.data;

const CREATE_TODO = 'CREATE_TODO';

const updateFinishedCount = () => {
  const unFinishedCount = todo.ids.filter(id => !todo.items[id].isFinished).length;
  todo.unFinishedCount = unFinishedCount;
};

export const createTodo = (value) => {
  const id = createID();
  const data = { id, isFinished: false, ...value };
  emitter.emit(CREATE_TODO, data);
}

emitter.on(CREATE_TODO, (value) => {
  const id = value.id;
  todo.items = { ...todo.items, [id]: value };
  todo.ids.push(id);
  updateFinishedCount();

  createLog('创建', id);
  updateStorage();
})

let deleteOneTodo = (id) => {
  const index = todo.ids.findIndex(item => item === id);
  todo.ids.splice(index, 1);
  // delete todo.items[id];
  // todo.item = todo.item;
}

let finishToggleOne = (id) => {
  todo.items = {
    ...todo.items,
    [id]: { ...todo.items[id], isFinished: !todo.items[id].isFinished }
  };
}

let finishToggleAll = () => {
  const toggleValue = todo.unFinishedCount > 0;
  const newItems = todo.ids.reduce((acc, id) => {
    acc[id] = {
      ...todo.items[id],
      isFinished: toggleValue
    }
    return acc;
  }, {})
  todo.items = newItems;
}

let deleteAllFinished = () => {
  const newIDS = todo.ids.filter(id => !todo.items[id].isFinished);
  todo.ids = newIDS;
  // const newItems = newIDS.reduce((acc, id) => {
  //   acc[id] = todo.items[id];
  //   return acc
  // }, {});
  // todo.items = newItems;
}

let actionList = {
  deleteOneTodo: { action: '删除', callback: deleteOneTodo },
  finishToggleOne: { action: 'finishToggleOne', callback: finishToggleOne },
  finishToggleAll: { action: 'finishToggleAll', callback: finishToggleAll },
  deleteAllFinished: { action: '删除所有已完成', callback: deleteAllFinished },
}

Object.keys(actionList).forEach((prop) => {
  let oldAction = actionList[prop].callback;
  const actionName = actionList[prop].action;
  actionList[prop] = (...args) => {
    oldAction(...args);
    updateFinishedCount();
    if (actionName) {
      const todoIDS = todo.ids;
      const todoID = args[0];
      if (actionName === 'finishToggleAll') {
        const isSetFinished = todo.items[todoIDS[0]].isFinished
        createLog(`全部${isSetFinished ? '完成' : '重启'}`)
      } else if (actionName === 'finishToggleOne') {
        const todoItem = todo.items[todoID];
        const isSetFinished = todoItem.isFinished
        createLog(`${isSetFinished ? '完成' : '重启'}`, todoID)
      } else {
        createLog(actionName, todoID)
      }
    }
    updateStorage();
  }
})

export default actionList;