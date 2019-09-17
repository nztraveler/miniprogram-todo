//app.js
App({
  data: {
    count: 0,
    items: [],
    itemDetail: {},
    finishedCount: 0,
  },

  updateFinished: function () {
    const finishedCount = this.data.items.filter(item => !this.data.itemDetail[item].isFinished).length;
    this.setData({ finishedCount });
    return finishedCount;
  },

  onCreate(e) {
    console.log(e);
    const count = this.data.count + 1;
    const newItem = {
      id: count,
      value: e.detail.value,
      isFinished: false,
    }
    console.log({ newItem })
    this.setData({ itemDetail: { ...this.data.itemDetail, [count]: newItem }, items: [...this.data.items, count], count }, this.updateFinished)
  },

  onDelete(e) {
    console.log('ondelete', e)
    const deleteID = e.detail.id;
    const newItems = this.data.items.reduce((acc, item) => {
      if (item === deleteID) return acc;
      console.log({ acc, item })
      acc.push(item)
      return acc;
    }, [])
    console.log({ newItems })
    // const finishedCount = this.updateFinished(newItems,this.data.itemDetail)
    this.setData({
      items: newItems,
      // finishedCount
    }, this.updateFinished)
  },

  onFinishToggle(e) {
    console.log(e)
    const finishID = e.detail.id;
    const path = `itemDetail.${finishID}.isFinished`
    this.setData({ [path]: e.detail.isFinished }, this.updateFinished)
  },

  onToggleAll() {
    const toggleValue = this.data.finishedCount>0;
    this.data.items.map(id => this.data.itemDetail[id].isFinished = toggleValue)
    this.setData({ itemDetail: this.data.itemDetail }, this.updateFinished)
  },

  onDeleteAllFinished() {
    const newItems = this.data.items.reduce((acc, id) => {
      if (this.data.itemDetail[id].isFinished === true) return acc;
      acc.push(id)
      return acc;
    }, []);
    this.setData({ items: newItems })
  }

})