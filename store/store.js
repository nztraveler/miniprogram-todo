import create from '../utils/create.js';

export const emitter = create.emitter;
export const store = {
  data: {
    todo: {
      ids: [],
      items: {},
      finishedCount: 0,
    },
    log: {
      dateSort: [],
      items: {}
    }
  }
}
