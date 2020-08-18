<template>
  <section class="container">
    <loading :active.sync="isLoading"></loading>
    <cart :shopping="apiShoppingData"></cart>
    <h2 class="mb-5 font-weight-bold">行李箱</h2>
    <div class="row">
      <!-- 商品分類 -->
      <div class="col-2 d-none d-lg-block">
        <h3 class="font-weight-bold">分類</h3>
        <div class="cursor--pointer list-group list-group-flush">
          <a v-for="(item, index) in category.list" :key="index" class="list-group-item list-group-item-action" @click.prevent="categoryData(item)">{{ item }}</a>
        </div>
      </div>
      <div class="col-12 d-lg-none">
        <select class="form-control mb-3" @change="categoryData($event.target.value)" v-if="category.list">
          <option :value="item" v-for="(item, index) in category.list" :key="index">{{ item }}</option>
        </select>
      </div>
      <!-- 商品列表 -->
      <div class="col-md-12 col-lg-10">
        <ul class="list__products row list-unstyled mb-5">
          <li class="col-12 col-md-6 col-lg-4" v-for="item in category.data" :key="item.id">
            <div class="card mb-3">
              <!-- v-for 會影響到全部 -->
              <!-- 方案一 : 產品列表可獨立選擇顏色 -->
              <!-- 方案二 : 產品內頁才選擇顏色 -->
              <router-link :to="`/product/${item.id}`">
                <img :src="item.imageUrl[0]" class="inner__productListImg object-fit rounded-top">
              </router-link>
              <div class="card-body">
                <!-- 商品標題 -->
                <h5 class="font-weight-bold">{{item.title}}</h5>
                <!-- 商品內容，描述作為 v-html -->
                <p class="mt-2 text-truncate">{{item.content}}</p>
                <!-- 商品價格 -->
                <div class="d-flex justify-content-between">
                  <small class="mb-0">
                    售價 : <del>{{item.origin_price}}</del>
                  </small>
                  <p class="font-weight-bold mb-0">特價 : {{item.price}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center ">
      <!-- :pages="pagination" 的 pagination是由這裡的 data所定義的，因為前面有使用 v-bind-->
      <pagination :pages="pagination" @emit-pages="getData"></pagination>
    </div>
  </section>
</template>

<script type="module">
import Pagination from '@/components/pagination.vue'
import Cart from '@/components/cart.vue'
export default {
  title: '台中行李箱維修 | 行李箱列表',
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
          vm.pagination = response.data.meta.pagination
          vm.category.data = vm.hexAPI.data
          vm.hexAPI.data.map((item) => {
            return vm.category.list.push(item.category)
          })
          vm.category.list = [...(new Set(vm.category.list))]
          vm.isLoading = false
        })
    },
    categoryData (categoryName) {
      const vm = this
      vm.category.data = []
      console.log(categoryName)
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
  },
  mounted () {
  }
}
</script>
