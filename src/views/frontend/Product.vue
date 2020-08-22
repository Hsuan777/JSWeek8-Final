<template>
  <section  class="container mt-6 mb-5">
    <loading :active.sync="isLoading"></loading>
    <cart :shopping="apiShoppingData"></cart>
    <notice :message="message" jumpTo="/products"></notice>
    <div class="row flex-row-reverse">
      <div class="col-md-12 col-lg-5">
        <div class="p-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white pl-0">
              <li class="breadcrumb-item">
                <router-link to="/products">產品列表</router-link>
              </li>
              <li class="breadcrumb-item active">
                行李箱
              </li>
            </ol>
          </nav>
          <h2 class="font-weight-bold">{{ hexAPI.product.title }}</h2>
          <div class="mb-3" v-if="hexAPI.product.options">
            <button type="button" v-for="(color, index) in hexAPI.product.options.colors" :key="index" class="btn btn-secondary mr-2 mb-2" @click.prevent="selectImg(hexAPI.product.imageUrl[index+1])">{{ color }}</button>
          </div>
          <div class="d-flex flex-column align-items-end mb-3">
            <small class="mb-0">
              售價 : <del>{{ hexAPI.product.origin_price }}</del>
            </small>
            <p class="font-weight-bold mb-0">特價 : {{ hexAPI.product.price }}</p>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="btn-group btn-group-lg btn-block" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-secondary text-dark" @click.prevent="productQuantity('reduce')"> - </button>
                <input type="button" class="btn btn-outline-secondary text-dark" :value="temporary.quantity" disabled>
                <button type="button" class="btn btn-outline-secondary text-dark" @click.prevent="productQuantity('add')"> + </button>
              </div>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-info btn-lg btn-block" @click.prevent="addShopping">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-6">
        <div class="card border-0">
          <div class="card-head p-0">
            <img :src="selectImage" class="img-fluid rounded-top">
          </div>
          <div class="card-body" v-if="hexAPI.product.imageUrl">
            <!-- 圖片列表 : 方案一 右側 -->
            <!-- 圖片列表 : 方案二 下方 -->
            <!-- TODO:左右滑動 loop -->
            <swiper class="swiper" :options="swiperOption" v-if="hexAPI.product.imageUrl[1]">
              <swiper-slide v-for="(item, index) in hexAPI.product.imageUrl" :key="index">
                <img :src="item" class="inner__iconImg" @click.prevent="selectImg(hexAPI.product.imageUrl[index])">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <!-- 商品內容，描述作為 v-html -->
            <div v-html="hexAPI.product.description"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import Cart from '@/components/cart.vue'
import Notice from '@/components/notice.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  components: {
    Cart,
    Notice,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      hexAPI: {
        product: {}
      },
      product: {
        id: {}
      },
      apiShoppingData: {
        data: [],
        moneyTotal: 0
      },
      temporary: {
        product: '',
        quantity: 1
      },
      isLoading: false,
      selectImage: '',
      message: '',
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    getProduct (pid) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${pid}`
        )
        .then((response) => {
          vm.hexAPI.product = response.data.data
          vm.selectImg(vm.hexAPI.product.imageUrl[0])
          vm.isLoading = false
        })
    },
    selectImg (imgURL) {
      this.selectImage = imgURL
    },
    addShopping () {
      const vm = this
      vm.isLoading = true
      vm.temporary.product = vm.hexAPI.product.id
      vm.axios
        .post(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`,
          vm.temporary
        )
        .then(() => {
          vm.getShopping()
          vm.message = '成功加入購物車!'
          $('#noticeModal').modal('show')
          vm.isLoading = false
        })
        .catch(() => {
          vm.message = '商品已存在，請購物車修改數量即可~'
          $('#noticeModal').modal('show')
          setTimeout(() => {
            $('#noticeModal').modal('hide')
          }, 3000)
          vm.isLoading = false
        })
    },
    getShopping () {
      const vm = this
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
        )
        .then((response) => {
          vm.apiShoppingData.data = response.data.data
          let total = 0
          vm.apiShoppingData.data.forEach((item) => {
            total += item.product.price * item.quantity
          })
          vm.apiShoppingData.moneyTotal = total
          vm.isLoading = false
        })
    },
    productQuantity (action) {
      const vm = this
      switch (action) {
        case 'add':
          vm.temporary.quantity += 1
          break
        case 'reduce':
          if (vm.temporary.quantity - 1 === 0) {
            alert('最低為 1!')
            vm.isLoading = false
          } else {
            vm.temporary.quantity -= 1
            break
          }
      }
    }
  },
  created () {
    this.getProduct(this.$route.params.id)
  }
}
</script>
