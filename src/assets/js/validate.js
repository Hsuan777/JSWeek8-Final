import { extend, ValidationObserver, ValidationProvider, configure, localize } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
localize('zhTW', zhTW)
export default {
  install (Vue) {
    Vue.component('ValidationObserver', ValidationObserver)
    Vue.component('ValidationProvider', ValidationProvider)
    extend('required', required)
    extend('email', email)
    extend('min', min)
    extend('tel', {
      message: '請輸入正確的手機號碼',
      validate: value => value.length === 11 && /^1[3456789]\d{9}$/.test(value)
    })
  }
}

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
