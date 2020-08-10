<template>
  <section  class="container mt-6 mb-5">
    <loading :active.sync="isLoading"></loading>
    <cart :shopping="apiShoppingData"></cart>
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="card">
          <div class="card-head">
            <img :src="selectImage" class="img-fluid rounded-top">
            <!-- <img :src="hexAPI.product.imageUrl[0]" class="img-fluid rounded-top"> -->
          </div>
          <div class="card-body">
            <p>{{ hexAPI.product.content }}</p>
          </div>
        </div>
      </div>
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
          <div class="" v-if="hexAPI.product.options">
            <button type="button" v-for="(color, index) in hexAPI.product.options.colors" :key="index" class="btn btn-secondary mr-2" @click.prevent="selectImg(hexAPI.product.imageUrl[index])">{{color}}</button>
          </div>
          <div class="d-flex flex-column align-items-end mb-3">
            <small class="mb-0">
              售價 : <del>{{hexAPI.product.origin_price}}</del>
            </small>
            <p class="font-weight-bold mb-0">特價 : {{hexAPI.product.price}}</p>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="btn-group btn-group-lg btn-block" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-secondary text-dark"> - </button>
                <button type="button" class="btn btn-outline-secondary text-dark"> 1 </button>
                <button type="button" class="btn btn-outline-secondary text-dark"> + </button>
              </div>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-info btn-lg btn-block">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cart from '@/components/Cart.vue'
export default {
  components: {
    Cart
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
      isLoading: false,
      selectImage: ''
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
    }
  },
  created () {
    // 或許可以用 $bus
    this.getProduct(this.$route.params.id)
  }
}
</script>
