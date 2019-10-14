import actionList from '../../store/action.js';
const {deleteOneTodo, finishToggleOne, finishToggleAll, deleteAllFinished, deleteOneLog} = actionList;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    logData: {
      type: Object
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClear() {
      console.log(this.data,this.properties)
      deleteOneLog(this.properties.logData.id,this.properties.logData.date)
    }
  }
})
