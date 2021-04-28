// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import VueRouter from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts';


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: VueRouter,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
