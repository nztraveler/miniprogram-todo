import { emitter, store} from './store.js';

const { todo, log} = store;
// class Action{
// constructor(appInstance){
// this.app = app
// }


// }
const CREATE_TODO = 'CREATE_TODO';




const createID = ()=> Math.floor(Date.now()*Math.random()*100)

export const createTodo = (value)=>{
  const id = createID();
  const data = {id, ...value};
  emitter.emit(CREATE_TODO,data);
}

emitter.on(CREATE_TODO,(value)=>{
  const id = value.id;
  todo.ids.push(id);
  todo.items[id] = value;
})