const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 提示框
 * @param title 提示的内容（必填）
 * @param icon  图标,默认值是 'success' (可选值有 loading，success，none)
 */
const showToast = (title, icon = "none") => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: 1500
    });
};

/**
 * 模态框
 * @param title 标题，不需要则传null,默认值为‘提示’ 必填
 * @param content 提示的消息 必填
 * @param confirmFun 确认回调 非必填
 * @param cancelFun  取消回调 非必填
 *
 */
const showModal = (title, content, confirmFun, cancelFun) => {
    wx.showModal({
        title: title ? title : "提示",
        content: content,
        success: function (res) {
            if (res.confirm) {
                if (typeof confirmFun === 'function') {
                    confirmFun();
                }
            } else if (res.cancel) {
                if (typeof cancelFun === 'function') {
                    cancelFun();
                }
            }
        }
    })
};

/**
 * 确认提示框
 * @param title
 * @param content
 */
const showConfirm = (title, content) => {
    wx.showModal({
        title: title ? title : "提示",
        content: content,
        showCancel: false,
        confirmColor: '#007aff'
    })
};

/**
 * 跳转到开放页面
 * @param url
 * @param successCallBack
 * @param failCallBack
 * @param complete
 */
const jumpToUrl = (url) => {
    wx.navigateTo({
        url: url,
    })
};
/**
 * 校验非负整数
 * @param num
 * @returns {boolean}
 */
function validateNonNegativeInteger(num) {
    var reg = new RegExp(/^(0|[1-9]\d*)$/);
    return reg.test(num);
}

/**
 * 校验正整数
 * @param num
 * @returns {boolean}
 */
function validatePositiveInteger(num) {
    var reg = new RegExp(/^[1-9]\d*$/);
    return reg.test(num);
}

/**
 * 校验浮点数
 * @param num
 * @returns {boolean}
 */
function validateDouble(num) {
    var reg = new RegExp(/^(0|[1-9]\d*)(\.\d{1,2})?$/);
    return reg.test(num);
}

/**
 * 校验网址 (需 http://或者https:// 开头)
 * @param url
 * @returns {boolean}
 */
function validateUrl(url) {
    var regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
    return regexp.test(url);
}

/**
 * 校验手机号码
 * @param mobile 手机号码
 * @returns {boolean}
 */
function validateMobile(mobile) {
    var reg = new RegExp(/^1[23456789]\d{9}$/);
    return reg.test(mobile);
}
function getDefaultImg(){
  return "https://lg-8lm3q58g-1255909459.cos.ap-shanghai.myqcloud.com/snack.jpg"
}
function getDb(){
  return wx.cloud.database();
}
/**
 * 重定向到开放页面
 * @param url
 * @param successCallBack
 * @param failCallBack
 * @param complete
 */
const redirectTo = (url,) => {
    wx.redirectTo({
        url: url,
    })
};

module.exports = {
    showToast: showToast,
    getDefaultImg: getDefaultImg,
    redirectTo: redirectTo,
    getDb: getDb,
    showModal: showModal,
    showConfirm: showConfirm,
    jumpToUrl: jumpToUrl,
    validateDouble: validateDouble,
    validatePositiveInteger: validatePositiveInteger,
    validateNonNegativeInteger: validateNonNegativeInteger,
    validateUrl: validateUrl,
    validateMobile: validateMobile,
  formatTime: formatTime
}
