
<template>
  <section class="container height--100vh">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <h2 class="text-center">Login</h2>
    <p class="text-center text-danger" v-if="isError">帳密有誤</p>
    <div class="row">
      <div class="col-md-6 col-lg-3 mx-auto">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="submitForm" class="mb-5">
            <validation-provider rules="email|required" v-slot="{ errors, classes }" tag="div" class="form-group">
              <label for="inputEmail" class="sr-only">Email address</label>
              <input type="email" id="inputEmail" name="Email" class="form-control" placeholder="Email address" v-model="user.email"
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
        .post(`${process.env.VUE_APP_APIPATH}auth/login`, vm.user)
        .then((res) => {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`
          vm.user.email = ''
          vm.user.password = ''
          vm.isError = false
          vm.$router.push('admin/products')
        })
        .catch(() => {
          vm.isLoading = false
          vm.isError = true
        })
    }
  }
}
</script>
