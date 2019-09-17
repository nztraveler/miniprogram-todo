// component/input/input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
    },
    placeholder: {
      type: String
    },
    prefix: {
      type: Object,
      value: null
    },
    suffix: {
      type: Object,
      value: null
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  options: {
    multipleSlots: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(e) {
      this.triggerEvent('confirm', { ...e.detail})
    }
  }
})