const util = require("../../utils/util.js");
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

    /**
     * 更新输入值
     */
    updateSnackData: function (e) {
      let snackSingleInput = "snackData." + e.currentTarget.id;
        this.setData({
            [snackSingleInput]: e.detail.value,
        });
        console.log("输入触发" + e.detail.value);
    },
    /**
     * 提交
     * @returns {boolean}
     */
    submitSnack: function () {
        let data = {
            snackName: this.data.snackData.snackName,
            snackTrait: this.data.snackData.snackTrait,
            snackMoney: this.data.snackData.snackMoney,
            crateTime: new Date(),
            likeQuality:0
        };
       if( !this.checkData(data)){
           return false;
       }
        const db = wx.cloud.database();
        db.collection('snack').add({
            // data 字段表示需新增的 JSON 数据
            data,
            success: function (res) {
                util.showModal("新增成功","是否还有吩咐?",()=>{util.redirectTo("../add/add")},()=>{util.redirectTo("../sancks/sancks")});
            }
        })
    },
    /**
     * 检查提交数据
     */
    checkData: function (data) {
        if(!data.snackName){
            util.showToast("你不告诉我买啥吗");
            return false;
        }
        if(!data.snackTrait){
            util.showToast("口味很重要,不要让我猜");
            return false;
        }
        if(!data.snackMoney){
            util.showToast("没钱还想剁手");
            return false;
        }
        if(!util.validateDouble(data.snackMoney)){
            util.showToast("请输入正确的金额懂?");
            return false;
        }
        return true;


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