export let getBaiDuToken = () => {
  return new Promise((resolve) => {
    wx.request({
      url: 'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=xxxxxxxx&client_secret=xxxxxxxxxx',
      method: 'GET',
      success: function (r) {
        resolve(r);
      },
      fail(res) {
        wx.showToast({
          title: "百度语音合成获取token接口错误",
          icon: 'none'
        });
      }
    })
  });
};