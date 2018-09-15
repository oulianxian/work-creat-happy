//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");
Page({
    data: {
        vereson: '1.0',
        openId: null,
        users: [],
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    jumpToEat: function () {util.jumpToUrl('../sancks/sancks');},
    onLoad: function () {

        wx.cloud.init({
            traceUser:true
        })
        console.log("进来了?" + app.globalData.userInfo )

        if (app.globalData.userInfo) {
            console.log("开始了" + app.globalData.userInfo)
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                console.log("进来了吗" + res.userInfo)
                this.otherOparation(res.userInfo)
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    console.log("res.userInfo"+res)
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                    console.log("进来了吗" + res.userInfo)

                }
            })
        }
    },
    otherOparation: function (userInfo){
        console.log("进来了" + userInfo);
        if (!userInfo){
            return;
        }

        const self = this;
        //获取openid
        wx.cloud.callFunction({
            name: 'test',
            complete: res => {
                console.log("拿到openid" +res.result.userInfo.openId)
                self.setData({
                    openId: res.result.userInfo.openId
                });
                this.findByOpenId(res.result.userInfo.openId);
            }
        })
    },
    getUserInfo: function (e) {

        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });

        this.otherOparation(e.detail.userInfo)
    },
    findByOpenId: function (openId) {
        console.log("用拿到的openid查数据哟" + openId)
        const db = wx.cloud.database();


        db.collection('user').where({_openid: openId})
            .get({
                success: function (res) {
                    // res.data 是包含以上定义的两条记录的数组
                    console.log("res.data.length查数据哟" + res.data.length)
                    if (res.data.length == 0) {
                        wx.navigateTo({
                            url: '../register/register?openId=' + openId,  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀

                        })
                    } else {
                        this.setData({
                            user: userData ? userData : null
                        })
                    }
                }
            })


    }
})
