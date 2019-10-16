import create from '../../utils/create.js';
import { store } from '../../store/store.js';
import actionList, { createTodo } from '../../store/action/index.js';

const { deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished } = actionList;

create(store, {
  onCreate(e) {
    const newItem = {
      content: e.detail.value,
      label: '',
      notes: ''
    }
    createTodo(newItem);
  },

  onDelete(e) {
    const deleteID = e.detail.id;
    deleteOneTodo(deleteID);
  },

  onFinishToggle(e) {
    const finishID = e.detail.id;
    finishToggleOne(finishID);
  },

  onToggleAll() {
    finishToggleAll();
  },

  onDeleteAllFinished() {
    deleteAllFinished();
  }
})
