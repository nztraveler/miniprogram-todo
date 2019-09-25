import create from '../utils/create.js';

export const emitter = create.emitter;
export const store = {
  todo: {
    ids: [],
    items: {}
  },
  log: {
    dateSort: [],
    item: {}
  }
}
