import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import './assets/styles/main.scss'
/* 套件 */
// axios，AJAX套件
import axios from 'axios'
import VueAxios from 'vue-axios'
// router，管理/建立網頁路由
import router from './router'
// loading，讀取特效
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// vee-validate，表單驗證
import Validate from './assets/js/validate.js'
// Aos
import AOS from 'aos'
import 'aos/dist/aos.css'
// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

// 將套件加入到原型或者作為元件
Vue.use(VueAxios, axios)

Vue.use(Validate)

Vue.component('loading', Loading)

const options = {
  confirmButtonColor: '#349baa'
}
Vue.use(VueSweetalert2, options)

Vue.filter('commaFormat', function (value) {
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT. ' + parts.join('.')
})

new Vue({
  created () {
    AOS.init()
  },
  router,
  render: h => h(App)
}).$mount('#app')
