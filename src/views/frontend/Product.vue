<template>
  <section  class="height--100vh container mb-5">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <cart :shopping="apiShoppingData"></cart>
    <div class="row flex-row-reverse">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <div class="p-lg-4 p-xl-3">
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
          <h2 class="font-weight-bold text-primary">
            {{ hexAPI.product.title }}
          </h2>
          <div class="mb-3" v-if="hexAPI.product.options">
            <button type="button" v-for="(color, index) in hexAPI.product.options.colors" :key="index" class="btn btn-secondary mr-2 mb-2" @click.prevent="selectImg(hexAPI.product.imageUrl[index+1])">{{ color }}</button>
          </div>
           <!-- 商品內容，描述作為 v-html -->
          <div v-html="hexAPI.product.description"></div>
          <div class="d-flex flex-column align-items-end mb-3" v-if=" hexAPI.product.origin_price">
            <small class="mb-0">
              售價 : <del>{{ hexAPI.product.origin_price|commaFormat }}</del>
            </small>
            <p class="font-weight-bold mb-0">特價 : {{ hexAPI.product.price|commaFormat }}</p>
          </div>
          <div class="row">
            <div class="col-6">
              <nav aria-label="Quantity navigation">
                <ul class="pagination pagination-lg mb-0">
                  <li class="page-item">
                    <button type="button" class="page-link border border-secondary text-dark" @click.prevent="productQuantity('reduce')"> - </button>
                  </li>
                  <li class="page-item">
                    <div class="page-link text-primary border border-secondary">{{ temporary.quantity }}</div>
                  </li>
                  <li class="page-item">
                    <button type="button" class="page-link border border-secondary text-dark" @click.prevent="productQuantity('add')"> + </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-info btn-lg btn-block h-100" @click.prevent="addShopping">
                <span class="d-none d-md-block">加入購物車</span>
                <span class="material-icons d-flex justify-content-center d-md-none">add_shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-5">
        <div class="card border-0">
          <div class="card-head p-0">
            <img :src="selectImage" class="inner__producImg object-fit rounded-top">
          </div>
          <div class="card-body position-relative" v-if="hexAPI.product.imageUrl">
            <swiper class="swiper" :options="swiperOption" v-if="hexAPI.product.imageUrl[1]">
              <swiper-slide v-for="(item, index) in hexAPI.product.imageUrl" :key="index">
                <img :src="item" class="inner__iconImg" @click="selectImg(hexAPI.product.imageUrl[index])">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="swiper-button-prev p-2" slot="button-prev" v-if="hexAPI.product.imageUrl[1]"></div>
            <div class="swiper-button-next p-2" slot="button-next" v-if="hexAPI.product.imageUrl[1]"></div>
          </div>
        </div>
      </div>
      <div class="col d-none d-md-block">
         <h3 class="mb-3">更多商品</h3>
         <swiper class="swiper" :options="otherProductSwiperOption">
          <swiper-slide v-for="(item, index) in hexAPI.data" :key="index">
            <router-link :to="`/product/${item.id}`" target="_blank">
              <img :src="item.imageUrl[0]" class="inner__iconImg" >
              <p class="text-center">{{ item.title }}</p>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import Cart from '@/components/Cart.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Cart,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      hexAPI: {
        data: {},
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
        spaceBetween: 10,
        centeredSlides: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      otherProductSwiperOption: {
        slidesPerView: 5,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }

    }
  },
  methods: {
    getData (page = 1) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}`
        )
        .then((response) => {
          vm.hexAPI.data = response.data.data
          vm.shuffleSelf(vm.hexAPI.data, 19)
          vm.isLoading = false
        })
    },
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
          vm.$swal({
            icon: 'success',
            iconHtml: '<span class="material-icons h2 mb-0">done_outline</span>',
            title: '成功加入購物車!!',
            showConfirmButton: false,
            timer: 2000
          })
          vm.isLoading = false
        })
        .catch(() => {
          vm.$swal({
            icon: 'error',
            iconHtml: '<span class="material-icons h2 mb-0">priority_high</span>',
            title: '商品已存在',
            text: '請在購物車修改數量即可~',
            confirmButtonText: '確定'
          })
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
            break
          } else {
            vm.temporary.quantity -= 1
            break
          }
      }
    },
    shuffleSelf (array, size) {
      let index = -1
      const length = array.length
      const lastIndex = length - 1
      size = size === undefined ? length : size
      while (++index < size) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = array[rand]
        array[rand] = array[index]
        array[index] = value
      }
      array.length = size
      return array
    }
  },
  created () {
    this.getProduct(this.$route.params.id)
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  .swiper-button-prev, .swiper-button-next {
    color: #9bdfe9;
  }
  .swiper-button-prev {
    margin-left: -18px;
  }
  .swiper-button-next {
    margin-right: -18px;
  }
  .swiper-pagination-bullets{
    bottom:-5px;
  }
</style>
