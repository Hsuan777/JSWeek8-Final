
<template>
  <section class="container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="text-center pt-5 my-5">Login</h2>
    <p class="text-center text-danger" v-if="isError">帳密有誤</p>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-3 mx-auto">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submitForm" class="mb-5">
            <!-- 為什麼空值會通過 -->
            <validation-provider
              rules="email|required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                name="Email"
                class="form-control"
                placeholder="Email address"
                v-model="user.email"
                :class="classes"
              />
              <p class="invalid-feedback">{{ errors[0] }}</p>
            </validation-provider>
            <validation-provider
              rules="min:6|required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                name="Password"
                class="form-control"
                placeholder="Password"
                v-model="user.password"
                :class="classes"
              />
              <p class="invalid-feedback">{{ errors[0] }}</p>
            </validation-provider>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-primary mb-2"
                @click.prevent="login"
                :disabled="invalid"
              >登入</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      isLoading: false,
      isError: false
    }
  },
  methods: {
    login (e) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .post(`${process.env.VUE_APP_APIPATH}auth/login`, this.user)
        .then((res) => {
          // 1. 送出驗證資訊後，驗證完畢取得 token以及到期日(expired)
          const token = res.data.token
          const expired = res.data.expired
          // 2. 取得上述的值後，就把它們存在 cookie，以便使用者在期限內再次登入
          // 參考 document.cookie MDN
          // someCookieName可自定義，true改成 傳送回來的 token
          // 到期日則是用 new Data()的方式
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`
          // 清空
          vm.user.email = ''
          vm.user.password = ''
          this.isError = false
          // $route是屬性
          // $router是方法
          // window.location = "products.html";
          this.$router.push('admin/products')
        })
        .catch(() => {
          this.isLoading = false
          this.isError = true
        })
    }
  }
}
</script>
