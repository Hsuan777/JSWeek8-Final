<template>
  <main>
    <!-- Banner -->
    <section class="container-fluid mb-5 banner__img banner__home" data-aos="zoom-out-up" data-aos-duration="1000">
      <div class="row ">
        <div class="container banner__title">
          <div class="row h-100 align-items-center">
            <div class="col">
              <h2 class="font-weight-bold" data-aos="fade-down" data-aos-delay="300">台中行李箱維修</h2>
              <h4 class="font-weight-bold mb-5" data-aos="fade-down" data-aos-delay="300">不分廠牌。現場維修</h4>
              <div class="btn-group">
                <router-link to="/repair" class="btn btn-info btn-lg font-weight-bold" data-aos="zoom-in-right" data-aos-delay="500">快速維修</router-link>
                <router-link to="/products" class="btn btn-primary btn-lg font-weight-bold" data-aos="zoom-in-left" data-aos-delay="800">行李箱</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-6"></div>
      </div>
    </section>
    <!-- 服務 -->
    <section class="container mb-5 pt-5">
      <h2 class="font-weight-bold text-center">優質服務</h2>
      <div class="row">
        <div class="col-6 col-lg-3 mb-3 mb-md-0" data-aos="zoom-in-up">
          <h3 class="d-flex flex-column align-items-center font-weight-bold">
            <span class="material-icons h2 text-info">trip_origin</span>
            不分品牌
          </h3>
          <p class="d-none d-md-block">各式行李箱問題皆可維修</p>
        </div>
        <div class="col-6 col-lg-3 mb-3 mb-md-0" data-aos="zoom-in-up" data-aos-delay="300">
          <h3 class="d-flex flex-column align-items-center font-weight-bold">
            <span class="material-icons h2 text-info">monetization_on</span>
            維修報價
          </h3>
          <p class="d-none d-md-block">上傳行李箱需維修處照片，立即為你確認可否維修及報價。</p>
        </div>
        <div class="col-6 col-lg-3 mb-3 mb-md-0" data-aos="zoom-in-up" data-aos-delay="600">
          <h3 class="d-flex flex-column align-items-center font-weight-bold">
            <span class="material-icons h2 text-info">shutter_speed</span>
            精選零件
            </h3>
          <p class="d-none d-md-block">維修精選高品質零件，品質有保障，讓你的輪子.手把等配件不再容易被水解、氧化損壞。</p>
        </div>
        <div class="col-6 col-lg-3" data-aos="zoom-in-up" data-aos-delay="900">
          <h3 class="d-flex flex-column align-items-center font-weight-bold">
            <span class="material-icons h2 text-info">filter_1</span>
            一年保固
          </h3>
          <p class="d-none d-md-block">本店維修零件提供您一年保固。</p>
        </div>
      </div>
    </section>
    <!-- 維修案例 -->
    <section class="container mb-5 pt-5">
      <h2 class="font-weight-bold text-center mb-3">維修案例</h2>
      <div class="row">
          <!-- 箱輪更換 -->
        <div class="col-md-12 col-lg-4 mb-3 mb-lg-0">
          <div class="form-row">
            <div class="col-6">
              <span class="material-icons text-danger h2 text-center w-100">
                unpublished
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/toRNDCE5uV4IvEe8r8pqNH86FFtSPDDg736TfAd8KK9yHthBuTH2t9AenIqjBm5areDayeoGrgVELOH0GqpnoFRckcCtYRC32zv5HtRCK4AFnmv4m7n31x3ER90zRTgt.jpg" alt="" class="inner__repairImg rounded object-fit border border-danger">
            </div>
            <div class="col-6">
              <span class="material-icons text-info h2 text-center w-100">
                check_circle
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/l4wcbpx6qFjCSbXALh0WULUhnaT6UMolZHHEtV8O0kK21OOEJRCFpXERE4EEmAMXWRIJ2lxpg4xvKL1R0hmGTl9HL9TlXR2k8R5a4ao4bmScSKYDSquBSpi7VMTuvcjU.jpg" alt="" class="inner__repairImg rounded object-fit border border-info" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
            </div>
          </div>
        </div>
        <!-- 把手更換 -->
        <div class="col-md-12 col-lg-4 mb-3 mb-lg-0">
          <div class="form-row">
            <div class="col-6">
              <span class="material-icons text-danger h2 text-center w-100">
                unpublished
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/jKCz3yyHkmAWPgzTASm4PWYYMUs2FYQ8ZQGpXUgHdgtizuYHxEd0wYlKqnCJCQvMK4980NcyNkmnNmMAxZz6lqv04Pm3vO5wiWosqxOGkyrZI2rGznCCAJapYRAKvnwW.jpg" alt="" class="inner__repairImg rounded object-fit border border-danger">
            </div>
            <div class="col-6">
              <span class="material-icons text-info h2 text-center w-100">
                check_circle
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/CkpGFLxVQpCP6Fwm863aknR2uXksKQ2Gu1Q85RsDn76pwaJ6YHqwPV8UftsufPFs1oPFZ1W9xNGiEWiYS0ilcZ6OFHqgd5Dl9Cd10L86T0gZNLWIzFI5wl8QECh1zrul.jpg" alt="" class="inner__repairImg rounded object-fit border border-info" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" data-aos-delay="300">
            </div>
          </div>
        </div>
        <!-- 拉桿更換 -->
        <div class="col-md-12 col-lg-4">
          <div class="form-row">
            <div class="col-6">
              <span class="material-icons text-danger h2 text-center w-100">
                unpublished
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/V79YBmsQRreHBX4ShMSnFPtOM6Bpm392V3lH1DjDwxjjUTZBpQlHc8DdcJNbFrXkC9MYjiaA6COKuh8wUK3noUJFlvyjJTai8IrDGPu9kp8IH5oMTsGgQ181bJabOItK.jpg" alt="" class="inner__repairImg rounded object-fit border border-danger">
            </div>
            <div class="col-6">
              <span class="material-icons text-info h2 text-center w-100">
                check_circle
              </span>
              <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/e7F1OgJw8amdvaASZ3y9DgHvbzLdKvMZVnTdZOIn8Zx7f41bIPCkYJCOtHzuC9TkDBnWDqntSqI8IVcX0we25lLmZZc5zudi40L4XXibBUclPeKSVlMmXZnb7OrHAb5r.jpg" alt="" class="inner__repairImg rounded object-fit border border-info" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" data-aos-delay="600">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 五星評價 -->
    <section class="container pt-5">
      <h2 class="font-weight-bold text-center">五星評價</h2>
      <h3 class="font-weight-bold text-center mb-3">感謝曾經來維修的各位給予肯定!</h3>
      <div class="row">
        <div class="col-md-12 col-lg-4" data-aos="zoom-in-up" data-aos-duration="1000">
          <div class="d-flex mb-2">
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
          </div>
          <p></p>
          <blockquote class="blockquote">
            <p>"在這疫情時期，大家出國的機會變少，但國旅正起步，在幾分鐘之內，有人買新箱子，有人電話諮詢，有人來取件，台中行李箱維修專業可靠，價格公道。 同樣的換手把跟換拉桿曾經到別家維修，費用不僅是台中行李箱維修兩倍，也沒辦法當場取件，台中行李箱維修替顧客省了來回的車資與時間，搭配上有透明的報價，絕對值得！ 非常謝謝老闆，專業的技術與服務及詳細透明的說明跟報價，難怪客人沒有停過，評價那麼好"</p>
            <footer class="blockquote-footer text-right mr-1">Ellisa Feng</footer>
          </blockquote>
        </div>
        <div class="col-md-12 col-lg-4" data-aos="zoom-in-up" data-aos-duration="1000">
          <div class="d-flex mb-2">
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
          </div>
          <p></p>
          <blockquote class="blockquote">
            <p>
              "給很專業的維修建議～而且速度很快❤️，現場取件!順便買了一個新箱子，超便宜的，cp值超高，超有質感，全新品，還有保固!
              很有人情味的店家，老闆親切隨和，講解細心，服務專業！！
              價格又很實在公道！真是不可多得的好店家！"</p>
            <footer class="blockquote-footer text-right mr-1">王舜慧</footer>
          </blockquote>
        </div>
        <div class="col-md-12 col-lg-4" data-aos="zoom-in-up" data-aos-duration="1000">
          <div class="d-flex mb-2">
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
            <span class="material-icons icon__grade">grade</span>
          </div>
          <blockquote class="blockquote">
            <p>"大黑陪我征戰多年，有感情糾葛捨不得丟，問了許多家，不是沒辦法修，就是叫你買新的，上網搜尋到台中行李箱維修，帶到現場給老闆看看，老闆看到此拉桿，輪子，手把，內裡都損壞，笑笑說，我幫你找回記憶，然後開始拆拉桿，拆輪子 ，修手把，縫內裡，每個工法都很到位，拉桿，輪子敲敲打打更換非常快，手把拆組速度也狠快，經驗非常老道，修理也不怕你看，細工部分，穿針引線也不馬虎，根本就是職人手工達人，非常感謝上天，讓我有機會遇到老闆，有種相見恨晚的感覺，老闆說只做有緣的人，合的來的人，維修就是這一回事而已。。。難怪老闆評價那麼好"</p>
            <footer class="blockquote-footer text-right mr-1">May Chung</footer>
          </blockquote>
        </div>
      </div>
    </section>
  </main>
</template>
