import { emitter, store } from './store.js';
import { getFormatDate, getDateOrder } from '../utils/util.js';

const { todo, log } = store.data;
// class Action{
// constructor(appInstance){
// this.app = app
// }


// }
const CREATE_TODO = 'CREATE_TODO';
const DELETE_ONE_TODO = 'DELETE_ONE_TODO';


const createID = () => Math.floor(Date.now() * Math.random() * 100) + ''

const updateFinishedCount = () => {
  const finishedCount = todo.ids.filter(id => !todo.items[id].isFinished).length;
  todo.finishedCount = finishedCount;
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
  const logItem = { action: '创建', content: value.content }
  log.items = { ...log.items, [logID]: logItem };
})

export const deleteOneTodo = (id)=>{
  const index = todo.ids.findIndex(item=>item===id);
  todo.ids.splice(index,1);
  delete todo.items[id];
  todo.item = todo.item;
  updateFinishedCount();
}

export const finishToggleOne = (id)=>{
  todo.items = { 
    ...todo.items,
     [id]: { ...todo.items[id], isFinished: !todo.items[id].isFinished }
     };
 updateFinishedCount();
}