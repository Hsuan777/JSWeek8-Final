<template>
  <section class="container">
    <div class="d-flex align-items-center">
      <h2 class="font-weight-bold d-flex justify-content-between mr-3 my-5">產品列表 (後臺管理)</h2>
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="d-flex justify-content-end mb-2">
      <button
        type="button"
        class="btn btn-primary btn-lg px-3"
        data-toggle="modal"
        data-target="#addProductModal"
        @click="initData"
      >新增產品</button>
    </div>
    <div class="table-responsive">
      <table class="table border-bottom">
        <thead>
          <tr>
            <th scope="row" class="text-nowrap">產品分類</th>
            <th scope="row" width="150px">產品名稱</th>
            <th scope="row" width="300px">產品顏色</th>
            <th scope="row" width="100px" class="text-right text-nowrap">原價</th>
            <th scope="row" width="100px" class="text-right text-nowrap">售價</th>
            <th scope="row" width="100px" class="text-center text-nowrap">是否開放</th>
            <th scope="row" class="text-nowrap">編輯</th>
          </tr>
        </thead>
        <tbody class="p-0">
          <tr v-for="(item) in hexAPI.data" :key="item.id">
            <td class="align-middle">{{item.category}}</td>
            <td class="align-middle">{{item.title}}</td>
            <td class="align-middle" v-if="item.options">
              <span v-for="(item, index) in item.options.colors" :key="index">
                。{{item}}
              </span>
            </td>
            <td class="text-right align-middle">{{item.origin_price}}</td>
            <td class="text-right align-middle">{{item.price}}</td>
            <td class="text-center align-middle">
              <span v-if="item.enabled" class="text-success">已開放</span>
              <span v-else class="text-danger">未開放</span>
            </td>
            <td class="pr-0">
              <div class="btn-group">
                <button
                  class="btn btn-secondary"
                  @click="copyData('edit', item)"
                >修改</button>
                <button
                  class="btn btn-outline-danger"
                  @click="copyData('delete', item)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center">
      <pagination :pages="pagination" @emit-pages="getData"></pagination>
    </div>

    <!-- add/edit Modal -->
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white font-weight-bold">{{ modalTitle }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="col-6">
                  <div class="form-group">
                    <label for class>商品圖片</label>
                    <input
                      type="text"
                      placeholder="請輸入圖片網址"
                      class="form-control"
                      v-for="(index) in temporary.imageUrl"
                      :key="index"
                      v-model="temporary.imageUrl[index]"
                    />
                  </div>
                  <img :src="temporary.imageUrl[index]" alt class="img-fluid" v-for="(index) in temporary.imageUrl" :key="index">
                  <!-- <img :src="temporary.imageUrl[0]" alt class="img-fluid">
                  <img :src="temporary.imageUrl[1]" alt class="img-fluid">
                  <img :src="temporary.imageUrl[2]" alt class="img-fluid">
                  <img :src="temporary.imageUrl[3]" alt class="img-fluid">
                  <img :src="temporary.imageUrl[4]" alt class="img-fluid">
                  <img :src="temporary.imageUrl[5]" alt class="img-fluid"> -->
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for class>商品名稱</label>
                    <input
                      type="text"
                      placeholder="產品名稱"
                      class="form-control"
                      v-model="temporary.title"
                    />
                  </div>
                  <div class="form-row justify-content-between">
                    <div class="col-6">
                      <div class="form-group">
                        <label for class>商品分類</label>
                        <input
                          type="text"
                          placeholder="分類名稱"
                          class="form-control"
                          v-model="temporary.category"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for class>單位</label>
                        <input
                          type="text"
                          placeholder="個"
                          class="form-control"
                          v-model="temporary.unit"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for class>原價</label>
                        <input
                          type="number"
                          placeholder
                          class="form-control"
                          v-model="temporary.origin_price"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for class>售價</label>
                        <input
                          type="number"
                          placeholder
                          class="form-control"
                          v-model="temporary.price"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for class>商品描述</label>
                    <textarea
                      type="text"
                      placeholder
                      class="form-control"
                      v-model="temporary.description"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for class>商品內容</label>
                    <textarea
                      type="text"
                      placeholder
                      class="form-control"
                      v-model="temporary.content"
                    ></textarea>
                  </div>
                  <!-- 若沒有 value，預設會是布林值 -->
                  <!-- TODO:接收資料回來時，可能還需要再多一個暫存空間放 options -->
                  <div class="form-check form-check-inline mb-3" v-for="(item, index) in product.options.colors" :key="index">
                    <input
                      type="checkbox"
                      :id="`checkbox${index}`"
                      class="form-check-input"
                      :value="item"
                      v-model="temporary.options.colors"
                      v-if="temporary.options"
                    >
                    <label :for="`checkbox${index}`" class="form-check-label">{{ item }}</label>
                  </div>
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="isUp"
                      class="form-check-input"
                      v-model="temporary.enabled"
                    />
                    <label for="isUp" class="form-check-label">是否開放</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateData"
              data-dismiss="modal"
            >Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete Modal -->
    <div
      class="modal fade"
      id="deleteProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white font-weight-bold">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>
              是否刪除
              <span class="text-danger">{{ temporary.title }}</span> ? 刪除後將無法復原 !
            </h3>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteData"
              data-dismiss="modal"
            >Delete</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  components: { Pagination },
  data () {
    return {
      product: {
        title: '鋁框行李箱',
        category: '行李箱',
        content: 'test',
        description: 'test',
        imageUrl: [
          'https://cf.shopee.tw/file/3c83aaa78b7bd35d18777790eb3d8a87',
          '',
          '',
          '',
          '',
          ''
        ],
        enabled: true,
        origin_price: '2000',
        price: '1000',
        unit: '個',
        options: {
          colors: ['曜石黑', '石墨綠', '玫瑰金']
          // sizes: ['26吋', '29吋']
        }
      },
      hexAPI: {
        data: []
      },
      pagination: {},
      temporary: {
        imageUrl: [],
        options: {
          colors: []
          // sizes: []
        }
      },
      modalTitle: '',
      isLoading: false
    }
  },
  props: ['token'],
  methods: {
    /* 取得遠端 API資料 */
    // 預設為 1
    getData (page = 1) {
      const vm = this
      // vm.axios的驗證指令，Bearer是後端用的
      vm.isLoading = true
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        // 原本是 products ->最終結果是取得所有資料
        // 改成 products?page=${page} -> 由後端給第一頁資料
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`)
        .then((res) => {
          // 取得該頁資料
          vm.hexAPI.data = res.data.data
          console.log(vm.hexAPI.data)
          // 取得分頁資訊
          vm.pagination = res.data.meta.pagination
          vm.isLoading = false
        })
    },
    /* 新增資料 */
    addData () {
      const vm = this
      console.log(vm.temporary)
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product`, vm.temporary)
        .then(() => {
          vm.getData()
        })
    },
    /* 新建資料 */
    // 將 this.product的屬性值複製到暫存
    initData () {
      this.modalTitle = '新增商品'
      // Object.assign 為潛層拷貝，若需要 options，則必須使用深拷貝
      // this.temporary = Object.assign({}, this.product)
      this.temporary = JSON.parse(JSON.stringify(this.product))
    },
    /* 複製資料 */
    // 將 v-for所取出的 item放入暫存
    copyData (action, item) {
      const vm = this
      vm.isLoading = true
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`)
        .then((res) => {
          this.temporary = Object.assign({}, res.data.data)
          vm.modalTitle = this.temporary.title
          vm.isLoading = false
          if (action === 'edit') {
            $('#addProductModal').modal('show')
          } else {
            $('#deleteProductModal').modal('show')
          }
        })
    },
    /* 修改資料 */
    updateData () {
      const vm = this
      vm.isLoading = true
      // if判斷，若有值則為 true
      if (vm.temporary.id) {
        vm.hexAPI.data.forEach((item) => {
          if (vm.temporary.id === item.id) {
            vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
            // patch跟 post一樣需要兩個參數 patch(`API網址`, 單一物件資料)，否則不會變更
            vm.axios
              .patch(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${vm.temporary.id}`, vm.temporary)
              .then(() => {
                vm.getData()
                vm.cleanData()
              })
          }
        })
      } else {
        vm.addData()
      }
      vm.cleanData()
    },
    /* 刪除資料 */
    deleteData () {
      const vm = this
      vm.isLoading = true
      vm.hexAPI.data.forEach((item) => {
        if (vm.temporary.id === item.id) {
          vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
          vm.axios
            .delete(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${vm.temporary.id}`)
            .then(() => {
              vm.getData()
              vm.cleanData()
              $('#deleteProductModal').modal('hide')
            })
        }
      })
    },
    // 工具類 //
    cleanData () {
      this.temporary = {
        imageUrl: []
      }
    }
  },
  created () {
    // 取出 token 名稱，若為空值則跳回 login.html，防止直接進 products.html
    // 由於 Dashboard.vue的 <router-view :token="token.api_token" v-if="checkSucces" />影響
    // 若 v-if="checkSucces" 為 false，不會將頁面導入
    this.getData()
  }
}
</script>
