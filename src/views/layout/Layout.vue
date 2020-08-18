<template>
  <div id="app">
    <!-- TODO: 要不要固定 nav? -->
    <nav id="nav" class="navbar navbar-expand-lg navbar-light font-weight-bold bg-white">
      <div class="container">
        <router-link to="/" class="navbar-brand text-primary">
          <h1 class="h2 d-flex align-items-center" @click="collapseHide">
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
          <ul class="navbar-nav">
            <li class="nav-item" @click="collapseHide">
              <router-link to="/products" class="nav-link">行李箱</router-link>
            </li>
            <li class="nav-item" @click="collapseHide">
              <router-link to="/repair" class="nav-link">快速維修</router-link>
            </li>
            <li class="nav-item" @click="collapseHide">
              <router-link to="/questions" class="nav-link">常見問題</router-link>
            </li>
            <li class="nav-item" @click="collapseHide">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <top></top>
    <router-view/>
    <footer class="bg-primary py-2">
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <div class="d-flex flex-column justify-content-center">
              <a href="http://maps.google.com/maps?q=台中市西屯區黎明路三段477號" class="text-dark text-nowrap text-decoration">
                台中市西屯區黎明路三段477號
              </a>
              <p class="mb-0 text-nowrap">週一 ~ 週六 10:00~17:00</p>
            </div>
          </div>
          <div class="col">
            <div class="d-flex justify-content-end align-items-center">
              <a
                href="tel:0903017408"
                class="h2 text-decoration-none text-white mb-0 mr-2">
                <i class="fas fa-phone-square-alt"></i>
              </a>
              <a
                href="https://www.facebook.com/%E5%8F%B0%E4%B8%AD%E8%A1%8C%E6%9D%8E%E7%AE%B1%E7%B6%AD%E4%BF%AE-2188614921350371/"
                class="h2 text-decoration-none text-white mb-0 mr-2">
                <i class="fab fa-facebook-square"></i>
              </a>
              <!-- TODO:暫時忽略正確帳號 -->
              <a
                href="https://line.me/ti/p/台中行李箱維修"
                class="h2 text-decoration-none text-white mb-0">
                <i class="fab fa-line"></i>
              </a>
            </div>
          </div>
          <div class="col-12 mt-1">
            <h4 class="text-center font-weight-bold mb-0">
              <span>台中行李箱維修</span>
              <small class="d-block d-md-inline"> © 2020. All Rights Reserved.</small>
            </h4>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import Top from '@/components/top.vue'
export default {
  components: {
    Top
  },
  methods: {
    collapseHide () {
      $('#navbarSupportedContent').collapse('hide')
    }
  }
}
</script>
