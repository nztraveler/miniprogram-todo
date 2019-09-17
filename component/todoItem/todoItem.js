// component/input/input.js
Component({
  properties: {
    item: {
      type: Object,
    },

  },

  // data: {
  //   isFinished: false,
  // },

  methods: {
    onFinishedToggle(e) {
      if(e.mark.delete) return;
      console.log('onFinishedToggle', e);
      const isFinished = !this.properties.item.isFinished;
      // this.setData({ isFinished })
      // console.log('onFinishedToggle', this.data.isFinished, this.properties.item.isFinished, isFinished);
      this.triggerEvent('finishToggle', { id: this.data.item.id, isFinished  }, { bubbles: true })
    },

    onDelete(e) {
      this.triggerEvent('deleteItem', { id: this.data.item.id }, { bubbles: true })
    },

  },

})
