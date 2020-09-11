<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-white sticky-top transition" :class="{'py-0':isPadding}">
      <div class="container">
        <router-link to="/" class="navbar-brand text-primary">
          <h1 class="h2 d-flex align-items-center mb-0" @click="collapseHide">
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
          <ul class="custom__nav navbar-nav ml-auto">
            <li class="nav-item custom__nav--hover" :class="{'active':navIndex === '0'}" @click="collapseHide('0')">
              <router-link to="/products" class="nav-link d-none d-lg-block">行李箱</router-link>
              <router-link to="/products" class="nav-link border-bottom d-lg-none">行李箱</router-link>
            </li>
            <li class="nav-item custom__nav--hover" :class="{'active':navIndex === '1'}" @click="collapseHide('1')">
              <router-link to="/about" class="nav-link d-none d-lg-block">關於我們</router-link>
              <router-link to="/about" class="nav-link border-bottom d-lg-none">關於我們</router-link>
            </li>
            <li class="nav-item custom__nav--hover" :class="{'active':navIndex === '2'}" @click="collapseHide('2')">
              <router-link to="/questions" class="nav-link d-none d-lg-block">常見問題</router-link>
              <router-link to="/questions" class="nav-link border-bottom d-lg-none">常見問題</router-link>
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
              <a href="https://maps.google.com/maps?q=台中市西屯區黎明路三段477號" target="_blank" class="text-white text-nowrap text-decoration">
                台中市西屯區黎明路三段477號
              </a>
              <p class="mb-0 text-nowrap text-white">週一 ~ 週六 10:00~17:00</p>
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
                class="h2 text-decoration-none text-white mb-0 mr-2" target="_blank">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                href="line://ti/p/@0903017408" target="_blank"
                class="h2 text-decoration-none text-white mb-0 d-lg-none">
                <i class="fab fa-line"></i>
              </a>
              <a
                href="https://line.me/R/ti/p/0903017408" target="_blank"
                class="h2 text-decoration-none text-white mb-0 d-none d-lg-block">
                <i class="fab fa-line"></i>
              </a>
            </div>
          </div>
          <div class="col-12">
            <p class="text-center text-secondary mb-0">
              <span>台中行李箱維修</span>
              <small class="d-block d-md-inline"> © 2020. All Rights Reserved.</small>
              <small class="d-block"> 商品價格為參考，實際價格更加優惠，歡迎來電詢問~</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import Top from '@/components/Top.vue'
export default {
  components: {
    Top
  },
  data () {
    return {
      navIndex: '',
      isPadding: false
    }
  },
  methods: {
    collapseHide (index) {
      this.navIndex = index
      $('#navbarSupportedContent').collapse('hide')
    },
    scrollToNav () {
      const vm = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 60) {
        vm.isPadding = true
      } else {
        vm.isPadding = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToNav)
  }
}
</script>
