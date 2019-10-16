// component/input/input.js
Component({
  data:{
    prefix:{
      show: true
    },
    onConfirm: ()=>{
     this.onConfirm();
    },

  },

  onConfirm(e) {
    const value = e.detail.value;
    if (!value) return;
    this.triggerEvent('createItem', { value })
    this.setData({ value: '' })
  },

  methods: {
    onConfirm(e) {
      const value = e.detail.value;
      if (!value) return;
      this.triggerEvent('createItem', { value })
      this.setData({value:''})
    },
    
  },

})
