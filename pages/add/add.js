// pages/test/healthService/registerVip/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        snackData: {
            snackName: "",
            snackTrait: "",
            snackMoney: ""
        }
    },
    updateSnackData: function (e) {
        let snackSingleInput = "this.data.snackData" + e.detail.name;
        this.setData({
            [snackSingleInput]: e.detail.value,
        });
        console.log("输入触发" + e.detail.value);
    },
    /**
     * 去往快速快速检测页面
     */
    submitSnack: function () {
        let data = {
            snackName: this.data.snackData.snackName,
            snackTrait: this.data.snackData.snackTrait,
            snackMoney: this.data.snackData.snackMoney,
            crateTime: new Date()
        };
       if( !this.checkData(data)){
           return false;
       }
        const db = wx.cloud.database();
        db.collection('snack').add({
            // data 字段表示需新增的 JSON 数据
            data,
            success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res);
                wx.navigateTo({
                    url: '../index/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
                    success: function () {
                    }
                })
            }
        })
    },
    /**
     * 检查提交数据
     */
    checkData: function (data) {
        if(!data.snackName||!data.snackTrait||!data.snackMoney){
            return false;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})