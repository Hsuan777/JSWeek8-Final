<template>
  <section class="height--100vh container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <cart :shopping="apiShoppingData"></cart>
    <h2 class="mb-5 font-weight-bold">行李箱</h2>
    <div class="row">
      <!-- 商品分類 -->
      <div class="col-2 d-none d-lg-block">
        <div class="custom__category--top sticky-top">
          <h3 class="font-weight-bold">分類</h3>
          <div class="custom__category cursor--pointer list-group list-group-flush">
            <a v-for="(item, index) in category.list" :key="index" class="list-group-item list-group-item-action rounded" :class="{'active':categoryIndex === index}" @click.prevent="categoryData(item, index)">{{ item }}</a>
          </div>
        </div>
      </div>
      <div class="custom__category--top col d-lg-none sticky-top">
        <select class=" form-control mb-3" @change="categoryData($event.target.value)" v-if="category.list">
          <option :value="item" v-for="(item, index) in category.list" :key="index">{{ item }}</option>
        </select>
      </div>
      <!-- 商品列表 -->
      <div class="col-md-12 col-lg-10">
        <ul class="list__products row list-unstyled mb-5">
          <li class="col-md-6 col-lg-4" v-for="item in category.data" :key="item.id">
            <div class="card border-0 mb-3">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.imageUrl[0]" class="inner__productListImg object-fit rounded">
              </router-link>
              <div class="card-body pl-0">
                <!-- 商品標題 -->
                <h5 class="font-weight-bold mb-0">{{ item.title }}</h5>
                <!-- 商品內容，描述作為 v-html -->
                <p class="text-truncate mb-0">{{ item.content }}</p>
                <!-- 商品價格 -->
                <div class="d-flex justify-content-between align-items-center">
                  <small class="mb-0">
                    售價 : <del>{{ item.origin_price|commaFormat }}</del>
                  </small>
                  <p class="font-weight-bold mb-0">特價 : {{ item.price|commaFormat }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center ">
      <pagination :pages="pagination" @emit-pages="getData"></pagination>
    </div>
  </section>
</template>

<script type="module">
import Pagination from '@/components/Pagination.vue'
import Cart from '@/components/Cart.vue'
export default {
  components: {
    Pagination,
    Cart
  },
  data () {
    return {
      hexAPI: {
        data: []
      },
      apiShoppingData: {
        data: [],
        moneyTotal: 0
      },
      temporary: {
        product: '',
        quantity: 1
      },
      pagination: {},
      isLoading: false,
      selectImage: false,
      category: {
        list: ['全部分類'],
        data: []
      },
      categoryIndex: 0
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
          vm.pagination = response.data.meta.pagination
          vm.category.data = vm.hexAPI.data
          vm.hexAPI.data.map((item) => {
            return vm.category.list.push(item.category)
          })
          vm.category.list = [...(new Set(vm.category.list))]
          vm.isLoading = false
        })
    },
    categoryData (categoryName, index = 0) {
      const vm = this
      vm.categoryIndex = index
      vm.category.data = []
      if (categoryName === '全部分類') {
        vm.category.data = vm.hexAPI.data
      } else {
        vm.hexAPI.data.map((item) => {
          if (item.category === categoryName) {
            vm.category.data.push(item)
          }
        })
      }
    }
  },
  created () {
    this.getData()
    this.categoryData()
  }
}
</script>
