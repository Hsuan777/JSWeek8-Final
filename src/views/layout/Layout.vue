<template>
  <div id="app">
    <!-- TODO:固定 nav在某些頁面會 RWD反而不適合 -->
    <nav id="nav" class="layout__nav navbar navbar-expand-lg navbar-light font-weight-bold bg-white">
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
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/products" class="nav-link">行李箱</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/repair" class="nav-link">快速維修</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/question" class="nav-link">常見問題</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/case" class="nav-link">維修案例</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
    <footer class="bg-primary">
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <h4 class="font-weight-bold">台中行李箱維修 <small>© 2020. All Rights Reserved.</small></h4>
          </div>
          <div class="col">
            <div class="d-flex justify-content-center">
              <a
                href="tel:0903017408"
                class="h2 text-decoration-none text-white mr-2">
                <i class="fas fa-phone-square-alt"></i>
              </a>
              <a
                href="https://www.facebook.com/%E5%8F%B0%E4%B8%AD%E8%A1%8C%E6%9D%8E%E7%AE%B1%E7%B6%AD%E4%BF%AE-2188614921350371/"
                class="h2 text-decoration-none text-white mr-2">
                <i class="fab fa-facebook-square "></i>
              </a>
              <a
                href="https://line.me/ti/p/台中行李箱維修"
                class="h2 text-decoration-none text-white">
                <i class="fab fa-line"></i>
              </a>
              <!-- TODO:蝦皮 icon -->
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
