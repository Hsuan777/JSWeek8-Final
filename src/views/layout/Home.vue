<template>
  <main>
    <!-- Banner -->
    <section class="container-fluid mb-5">
      <div class="row">
        <div class="container banner__title">
          <div class="row h-100 align-items-center">
            <div class="col">
              <div class=" ">
                <h2 class="font-weight-bold mb-5">{{ title }}</h2>
                <div class="btn-group">
                  <router-link to="/repair" class="btn btn-info btn-lg font-weight-bold">快速維修</router-link>
                  <router-link to="/products" class="btn btn-primary btn-lg font-weight-bold">行李箱</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner__img banner__home col-md-12 col-lg-6"></div>
      </div>
    </section>
    <!-- 服務 -->
    <section class="container py-5 mb-5">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <h2 class="d-flex flex-column align-items-center">
            <span class="material-icons h2 text-info">trip_origin</span>
            不分品牌
          </h2>
          <p>各式行李箱問題皆可維修</p>
        </div>
        <div class="col-lg-3 col-md-6">
          <h2 class="d-flex flex-column align-items-center">
            <span class="material-icons h2 text-info">monetization_on</span>
            維修報價
          </h2>
          <p>上傳行李箱需維修處照片，立即為你確認可否維修及報價。</p>
        </div>
        <div class="col-lg-3 col-md-6">
          <h2 class="d-flex flex-column align-items-center">
            <span class="material-icons h2 text-info">shutter_speed</span>
            精選零件
            </h2>
          <p>維修精選高品質零件，品質有保障，讓你的輪子.手把等配件不再容易被水解、氧化損壞。</p>
        </div>
        <div class="col-lg-3 col-md-6">
          <h2 class="d-flex flex-column align-items-center">
            <span class="material-icons h2 text-info">filter_1</span>
            一年保固
          </h2>
          <p>本店維修零件提供您一年保固。</p>
        </div>
      </div>
    </section>
    <section class="container">
      <!-- Special Clays -->
      <div class="row mb-lg-4 mb-3">
        <div class="col-md-6 col-12 mb-2 mb-md-0">
          <img src="https://images.unsplash.com/photo-1564209510114-d98212b0e861?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80" alt="" class="inner__img img-fluid rounded object-fit">
        </div>
        <div class="col-md-6  ">
          <div class="row justify-content-center align-items-center h-100 ">
            <main class="col-md-8 col-12 ">
              <h3 class="font-weight-bold mb-2">海關鎖</h3>
              <p class="mb-3">A general body formulation for contemporary earthenware is 25% kaolin, 25% ball clay, 35%
                quartz and 15% feldspar.</p>
              <a href="" class="font-weight-bold text-decoration-none text-primary">Learn more</a>
            </main>
          </div>
        </div>
      </div>

      <!-- Less is more -->
      <div class="row flex-lg-row-reverse mb-lg-4 mb-3 ">
        <div class="col-md-6 col-12 mb-2 mb-md-0">
          <div class="d-flex justify-content-center">
            <img src="https://images.unsplash.com/photo-1553061625-5996e4721a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="" class="inner__img img-fluid object-fit rounded">
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="row justify-content-center align-items-center h-100 text-lg-right ">
            <main class="col-md-8 col-12 ">
              <h3 class="font-weight-bold mb-2">高品質拉鍊</h3>
              <p class="mb-3">Trimming pottery can transform a weighty Earth-bound pot into one that is a pleasure to
                hold, look at, and use.</p>
              <a href="" class="font-weight-bold text-decoration-none text-primary">Learn more</a>
            </main>
          </div>
        </div>
      </div>

      <!-- Marvelous Detail -->
      <!-- <div class="row mb-lg-6 mb-5">
        <div class="col-md-6 col-12 mb-2 mb-md-0">
          <img src="assets/images/index_tom-crew-GOtE6-VOwH0-unsplash.jpg" alt="" class="img-fluid object-fit ">
        </div>
        <div class="col-md-6  ">
          <div class="row justify-content-center align-items-center h-100 ">
            <main class="col-md-8 col-12 ">
              <h3 class="font-weight-bold mb-2">Marvelous Detail</h3>
              <p class="mb-3">In Craftsman, the art director, working with marketers, develops or creates an idea of a
                new creation.</p>
              <a href="" class="font-weight-bold text-decoration-none text-primary">Learn more</a>
            </main>
          </div>
        </div>
      </div> -->
    </section>
  </main>
</template>
<script>
export default {
  data () {
    return {
      title: ' 台中行李箱維修'
    }
  }
}
</script>
