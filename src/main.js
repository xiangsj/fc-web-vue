// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from "axios"
import qs from "qs"
import '../static/css/common.css'
import '../static/css/elementui.css'
import store from "./store/index.js"
import './common/common.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {UserLoginApi} from "./config/Api";

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
//https://segmentfault.com/a/1190000011811117

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,

  },
  template: '<App/>'
});

/*axios.defaults.withCredentials=true;*/
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};
//请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.url === UserLoginApi) {
    return config
  }
  let Ticket = JSON.parse(localStorage.getItem("Ticket"));
  config.headers = {
    'Authorization': 'BasicAuth ' + Ticket,
    ...config.headers
  };
  return config
}, function (error) {
  vue.$notify.error({
    title: '错误',
    message: '请求失败'
  });
  return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response.data.code);
  // console.log(response.data.msg);
  if (response.data.code !== 0) {
    switch (response.data.code.toString()) {
      case "301":
        console.log("aaaa");
        vue.$notify.error({
          title: '提示',
          message: '您的权限已失效，2秒后自动跳转到登录页',
        });
        setTimeout(function () {
          location.href = "/";
        }, 2080);
        break;
      case "100": //
        vue.$notify.error({
          title: '提示',
          message: '表单校验失败',
        });
        throw new Error("表单校验失败");
        break;

      case "400":
        vue.$notify.error({
          title: '提示',
          message: '上传图片格式不合法',
        });
        throw new Error("上传图片格式不合法");
        break;

      case "600":
        vue.$notify.error({
          title: '提示',
          message: '获取信息失败',
        });
        throw new Error("获取信息失败");
        break;
      case "1000":
        vue.$notify.error({
          title: '提示',
          message: '未获取到数据',
        });
        throw new Error("未获取到数据");
        break;
      case "302":
        vue.$notify.error({
          title: '提示',
          message: '凭证异常',
        });
        throw new Error("凭证异常");
        break;
      case "10001":
        vue.$notify.error({
          title: '提示',
          message: '商户号不存在',
        });
        throw new Error("商户号不存在");
        break;
      case "10002":
        vue.$notify.error({
          title: '提示',
          message: '用户名或密码错误',
        });
        //抛出一个异常，内容是：用户名或密码错误
        throw new Error("用户名或密码错误");
        break;

      case "10003":
        vue.$notify.error({
          title: '提示',
          message: '验证码错误',
        });
        throw new Error("验证码错误");
        break;

      case "10004":
        vue.$notify.error({
          title: '提示',
          message: '手机验证码错误',
        });
        throw new Error("手机验证码错误");
        break;

      case "11036":
        vue.$notify.error({
          title: '提示',
          message: '传入参数不合法',
        });
        throw new Error("传入参数不合法");
        break;
      case "11037":
        vue.$notify.error({
          title: '提示',
          message: '参数不合法',
        });
        throw new Error("参数不合法");
        break;
      case "200":
        vue.$notify.error({
          title: '提示',
          message: '名称已存在',
        });
        throw new Error("名称已存在");
        break;
      case "500":
      vue.$notify.error({
        title: '提示',
        message: '系统异常',
      });
      throw new Error("系统异常");
      break;
    }
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  console.log(error);
  vue.$notify.error({
    title: '错误',
    message: '响应失败'
  });
  return Promise.reject(error);
});
