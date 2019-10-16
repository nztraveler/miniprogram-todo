import { store } from '../store.js';
import { getFormatDate, getDateOrder, createID } from '../../utils/util.js';
import { updateStorage } from './index.js';

const { log, todo } = store.data;

export const createLog = (action, todoID) => {
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

  const logItem = { action, content: todo.items[todoID] ? todo.items[todoID].content : '', id: logID, date: now }
  log.items = { ...log.items, [logID]: logItem };
}

export const deleteOneLog = (id, date) => {
  console.log({id, date})
  const newDataSort = log.dateSort.filter(data => {
    if (data.date.formatValue === date.formatValue) {
      const newIds = data.ids.filter(oldID => oldID !== id)
      if (newIds.length < 1) return false;
      data.ids = newIds;
    }
    return true;
  });

  delete log.items[id];
  log.dateSort = newDataSort;
  log.items = log.items;
  updateStorage();
}