import { emitter, store } from './store.js';
import { getFormatDate, getDateOrder, createID } from '../utils/util.js';

const { todo, log } = store.data;

const CREATE_TODO = 'CREATE_TODO';
const DELETE_ONE_TODO = 'DELETE_ONE_TODO';

const updateFinishedCount = () => {
  const unFinishedCount = todo.ids.filter(id => !todo.items[id].isFinished).length;
  todo.unFinishedCount = unFinishedCount;
};

const createLog = (action, todoID) => {
  const logID = createID();
  const now = getFormatDate();
  let { dateSort } = log;

  const existIndex = dateSort.findIndex(item => item.date.formatValue === now.formatValue);

  if (existIndex >= 0) {
    dateSort[existIndex].ids.push(logID);
  } else {
    const orderIndex = getDateOrder(dateSort, now);
    dateSort.splice(orderIndex, 0, { date: now, ids: [logID] })
  }
  dateSort = dateSort;

  const logItem = { action, content: todo.items[todoID] ? todo.items[todoID].content : '', id: logID, date:now}
  log.items = { ...log.items, [logID]: logItem };
}

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

  updateStorage();
  createLog('创建', id);
})

let deleteOneTodo = (id) => {
  const index = todo.ids.findIndex(item => item === id);
  todo.ids.splice(index, 1);
  // delete todo.items[id];
  // todo.item = todo.item;
  updateFinishedCount();
}

let finishToggleOne = (id) => {
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
  todo.ids = newIDS;
  // const newItems = newIDS.reduce((acc, id) => {
  //   acc[id] = todo.items[id];
  //   return acc
  // }, {});
  // todo.items = newItems;
  updateFinishedCount();
}

let deleteOneLog = (id,date) => {
  console.log({ id, date},'deleteID')
  const newDataSort= log.dateSort.filter(data => {
    if(data.date.formatValue ===date.formatValue){
      const newIds = data.ids.filter(oldID=>oldID!==id)
      if (newIds.length<1) return false;
      data.ids = newIds;
    }
    return true;
  });

  delete log.items[id];
  log.ids = newDataSort;
  log.items = log.items;
  updateStorage();
}

function updateStorage() {
  wx.setStorage({
    key: 'todo',
    data: store.data,
    success: (result) => {
    },
    fail: () => { },
    complete: () => { }
  });
}
let actionList = {
  deleteOneTodo: { action: '删除', callback: deleteOneTodo },
  finishToggleOne: { action: 'finishToggleOne', callback: finishToggleOne },
  finishToggleAll: { action: 'finishToggleAll', callback: finishToggleAll },
  deleteAllFinished: { action: '删除所有已完成', callback: deleteAllFinished },
  deleteOneLog: { callback: deleteOneLog },
}

// let actionList = [deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished, deleteOneLog,deleteOneLog]
Object.keys(actionList).forEach((prop) => {
  let oldAction = actionList[prop].callback;
  const actionName = actionList[prop].action;
  actionList[prop] = (...args) => {
    oldAction(...args);
    if (actionName) {
      const todoIDS = todo.ids;
      const todoID = args[0];
      if (actionName === 'finishToggleAll') {
        const isSetFinished = todo.items[todoIDS[0]].isFinished
        createLog(`全部${isSetFinished ? '完成' : '重启'}`)
        return;
      }
      if (actionName === 'finishToggleOne') {
        const todoItem = todo.items[todoID];
        const isSetFinished = todoItem.isFinished
        createLog(`${isSetFinished ? '完成' : '重启'}`, todoID)
        return;
      }
      createLog(actionName, todoID)
    }
    updateStorage();
  }
})
// deleteOneTodo = actionList[0];
export default actionList;