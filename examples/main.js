import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入组件库
import supermbglUi from './../packages'
import '@supermap/iclient-mapboxgl';
// 注册组件库
Vue.use(supermbglUi)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

