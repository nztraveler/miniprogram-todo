import { emitter, store } from './store.js';
import { getFormatDate, getDateOrder, createID } from '../utils/util.js';

const { todo, log } = store.data;
// class Action{
// constructor(appInstance){
// this.app = app
// }


// }
const CREATE_TODO = 'CREATE_TODO';
const DELETE_ONE_TODO = 'DELETE_ONE_TODO';

const updateFinishedCount = () => {
  const unFinishedCount = todo.ids.filter(id => !todo.items[id].isFinished).length;
  todo.unFinishedCount = unFinishedCount;
};
export const createTodo = (value) => {
  console.log('createTodo', { value })
  const id = createID();
  const data = { id, isFinished: false, ...value };
  emitter.emit(CREATE_TODO, data);
}

emitter.on(CREATE_TODO, (value) => {
  const id = value.id;
  todo.items = { ...todo.items, [id]: value };
  todo.ids.push(id);
  updateFinishedCount();

  const logID = createID();
  const now = getFormatDate();
  let { dateSort } = log;

  const existIndex = dateSort.findIndex(item => item.date.formatValue === now.formatValue);
  if (existIndex > 0) {
    dateSort[existIndex].ids.push(logID);
    dateSort = dateSort;
    return;
  }

  const orderIndex = getDateOrder(dateSort, now);
  dateSort.splice(orderIndex, 0, { date: now, ids: [logID] })
  const logItem = { action: '创建', content: value.content, id: logID }
  log.items = { ...log.items, [logID]: logItem };
  updateStorage();
})

let deleteOneTodo = (id) => {
  const index = todo.ids.findIndex(item => item === id);
  todo.ids.splice(index, 1);
  delete todo.items[id];
  todo.item = todo.item;
  updateFinishedCount();
}

let finishToggleOne = (id) => {
  console.log('finishToggleOne',{
    id,
    items:todo.items
  })
  todo.items = {
    ...todo.items,
    [id]: { ...todo.items[id], isFinished: !todo.items[id].isFinished }
  };
  updateFinishedCount();
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
  updateFinishedCount();
}

let deleteAllFinished = () => {
  const newIDS = todo.ids.filter(id => !todo.items[id].isFinished);
  const newItems = newIDS.reduce((acc, id) => {
    acc[id] = todo.items[id];
    return acc
  }, {});
  todo.ids = newIDS;
  todo.items = newItems;
  updateFinishedCount();
}

let deleteOneLog = (id) => {
  const newIDs = log.ids.filter(data => id !== data.id);
  delete log.items[id];
  log.ids = newIDs;
  log.items = log.items;
  updateStorage();
}

function updateStorage() {
  console.log('updateStorage', store.data)
  wx.setStorage({
    key: 'todo',
    data: store.data,
    success: (result) => {
      console.log('success', result)
    },
    fail: () => { },
    complete: () => { }
  });
}
let actionList = {
  deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished, deleteOneLog
}

// let actionList = [deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished, deleteOneLog,deleteOneLog]
Object.keys(actionList).forEach((prop) => {
  let oldAction =  actionList[prop];
  actionList[prop] = (...args) => { oldAction(...args); updateStorage() }
})
// deleteOneTodo = actionList[0];
export default actionList;