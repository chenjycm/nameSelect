// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {Input, Button, Select, Option, DatePicker, Pagination, Tag} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Vuex)
/* eslint-disable no-new */
Vue.use(Input).use(Button).use(Select).use(Option).use(DatePicker)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
