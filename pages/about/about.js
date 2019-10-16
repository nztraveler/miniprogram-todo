// pages/about/about.js
Page({
  onUserInfo(e) {
    wx.navigateTo({
      url: './me/me',
    });
  },
  onSetting(){
    wx.navigateTo({
      url: './setting/setting',
    });
  },
})