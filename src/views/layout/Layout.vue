<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light font-weight-bold fixed-top">
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
  </div>
</template>
