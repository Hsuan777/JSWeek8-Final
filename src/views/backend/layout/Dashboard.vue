<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-secondary">
      <div class="container">
        <router-link to="/" class="navbar-brand text-primary">
          <h1 class="h2 d-flex align-items-center">
            <span>Suitcase</span>
            <span class="material-icons">construction</span>
          </h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link">產品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/order" class="nav-link">訂單管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupon" class="nav-link">優惠券管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/storages" class="nav-link">檔案管理</router-link>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link" data-toggle="modal" data-target="#signoutModal">Signout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view v-if="checkSucces" />

    <!-- signout Modal -->
    <div
      class="modal fade"
      id="signoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title">是否登出 ?</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action>
              <div class="d-flex justify-content-around">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="signout"
                  data-dismiss="modal"
                >登出</button>
                <button type="button" class="btn btn-outline-secondary text-dark" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSucces: false
    }
  },
  methods: {
    signout (e) {
      document.cookie = 'hexToken=; expires=; path=/'
      this.$router.push('/')
    },
    checkToken () {
      const vm = this
      vm.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (vm.token.api_token === '') {
        vm.$router.push('/')
      } else {
        vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
        vm.axios
          .post(`${process.env.VUE_APP_APIPATH}auth/check`, { api_token: vm.token })
          .then((res) => {
            vm.checkSucces = true
          })
          .catch(() => vm.$router.push('/'))
      }
    }
  },
  created () {
    this.checkToken()
  }
}
</script>
