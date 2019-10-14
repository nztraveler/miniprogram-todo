// component/input/input.js
Component({
  properties: {
    item: {
      type: Object,
    },

  },

  data: {
    isShowNote: false,
  },

  methods: {
    onFinishedToggle(e) {
      if(e.mark.delete||e.mark.showNote) return;
      this.triggerEvent('finishToggle', { id: this.data.item.id  }, { bubbles: true })
    },

    onDelete(e) {
      this.triggerEvent('deleteItem', { id: this.data.item.id }, { bubbles: true })
    },

    onToggleNote(){
      this.setData({isShowNote: !this.data.isShowNote})
    }
  },

})
