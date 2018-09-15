const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
   */
  data: {
      snackList: [],
      defaultImg: util.getDefaultImg()
  },
    jumpToAdd: function() {
        util.jumpToUrl('../add/add');
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let self = this;
      util.getDb().collection('snack').get(
          {
              success: function (res) {

                  console.log("res.data.length查数据哟" + res.data.length);
                  self.setData({
                      snackList: res.data || []
                  })

              }
          }
      )

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      util.showToast("你拉到底部了");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})