// pages/create/create.js
Page({
onSubmit(e){
  const value = e.detail.value;
  if(!value.content){
    wx.showToast({ title: '请填写代办内容', icon:'none'})
    return;
  }
console.log(e)
}
})