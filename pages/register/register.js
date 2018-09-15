
Page({
  /**
   * 页面的初始数据
   */
  data: {
      keyWords:'',//会员搜索关键字
      team: ''//会员搜索关键字
  },
  onLoad: function (options) {
    console.log("options.openId找到了吗" + options.openId)
    this.setData({
      openId: options.openId
    })
  },
   /**
    * 监听页面文本框失去焦点事件并获取文本框输入值
    * @param e
    */
  updateValue:function(e){
    let self = this;
        self.setData({
            keyWords:e.detail.value,
        });
  },
  updateTeamValue: function (e) {
    let self = this;
    self.setData({
      team: e.detail.value,
    });
  },
  /**
   * 去往快速快速检测页面
   */
  gotoFastCheck:function(){
    console.log("this.keyWords找到了吗" + this.data.keyWords);
    console.log("this.openid找到了吗" + this.data.openid)
    const db = wx.cloud.database()
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        name: this.data.keyWords,
        openId: this.data.openid,
        team: this.data.team
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.navigateTo({
          url: '../index/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
          success: function () { }
        })
      }
    })
  },

  /**
   * 构建搜索参数
   */
  buildSearchData:function(){
    let self = this;
    return{
      keyWords:self.data.keyWords,
    }
  }
});