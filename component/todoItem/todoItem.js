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
      console.log('onFinishedToggle', e,  this.data.item);
      // const isFinished = !this.properties.item.isFinished;
      // this.setData({ isFinished })
      // console.log('onFinishedToggle', this.data.isFinished, this.properties.item.isFinished, isFinished);
      this.triggerEvent('finishToggle', { id: this.data.item.id  }, { bubbles: true })
    },

    onDelete(e) {
      this.triggerEvent('deleteItem', { id: this.data.item.id }, { bubbles: true })
    },

    onToggleNote(){
      this.setData({isShowNote: !this.data.isShowNote})
    }
  },

  lifetimes:{
    attached: function(){
      console.log('attached', JSON.stringify(this.properties), JSON.stringify(this.data) )
    },
    created: function(){
      console.log('created', JSON.stringify(this.properties), JSON.stringify(this.data))
    },
    ready: function(){
      console.log('created', JSON.stringify(this.properties), JSON.stringify(this.data))
    }

  }

})
