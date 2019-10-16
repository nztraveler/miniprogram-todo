import {deleteOneLog} from '../../store/action/index.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    logData: {
      type: Object
    },
    isShowTime:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClear() {
      deleteOneLog(this.properties.logData.id,this.properties.logData.date)
    }
  }
})
