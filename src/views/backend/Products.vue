<template>
  <section class="container">
    <div class="d-flex align-items-center">
      <h2 class="font-weight-bold d-flex justify-content-between mr-3 my-5">產品列表 (後臺管理)</h2>
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
            <td class="align-middle">{{ item.category }}</td>
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle" v-if="item.options">
              <span v-for="(color) in item.options.colors" :key="color">
                。{{color}}
              </span>
            </td>
            <td class="text-right align-middle">{{ item.origin_price|commaFormat }}</td>
            <td class="text-right align-middle">{{ item.price|commaFormat }}</td>
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
                    <label for class>商品圖片(點輸入欄位預覽)
                      <button type="button" class="btn btn-secondary btn-sm mr-2" @click.prevent="addCell(temporary.imageUrl)">增加圖片欄位</button>
                      <button type="button" class="btn btn-secondary btn-sm" @click.prevent="removeCell(temporary.imageUrl)">移除圖片欄位</button>
                    </label>
                    <blockquote v-for="(item, index) in temporary.imageUrl" :key="index">
                      <input
                        type="text"
                        placeholder="請輸入圖片網址"
                        class="form-control"
                        v-model="temporary.imageUrl[index]"
                        @focus="viewImage(item)"
                      />
                    </blockquote>
                  </div>
                  <img :src="viewImageSrc" alt class="img-fluid">
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
                  <!-- TODO: 接收資料回來時，options的 color屬性所對應的圖片顏色如何隨著購物車走 ? -->
                  <div class="form-group" >
                    <label class="form-label">商品顏色
                      <button type="button" class="btn btn-secondary btn-sm mr-2" @click.prevent="addCell(temporary.options.colors)">增加顏色</button>
                      <button type="button" class="btn btn-secondary btn-sm" @click.prevent="removeCell(temporary.options.colors)">移除顏色</button>
                    </label>
                    <div class="form-row justify-content-between">
                      <div class="col-6" v-for="(color, index) in temporary.options.colors" :key="index">
                        <input
                        type="text"
                        :id="`checkbox${index}`"
                        class="form-control mb-2"
                        v-model="temporary.options.colors[index]"
                      >
                      </div>
                    </div>
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
            <h5 class="modal-title text-white">刪除商品</h5>
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
   <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/Spinner-1s-177px.gif" alt="">
      </template>
    </loading>
    <notice :message="message"></notice>
  </section>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import Notice from '@/components/Notice.vue'
export default {
  components: {
    Pagination,
    Notice
  },
  data () {
    return {
      product: {
        title: '鋁框行李箱',
        category: '行李箱',
        content: 'test',
        description: 'test',
        imageUrl: [
          'https://cf.shopee.tw/file/3c83aaa78b7bd35d18777790eb3d8a87'
        ],
        enabled: true,
        origin_price: '2000',
        price: '1000',
        unit: '個',
        options: {
          colors: ['曜石黑', '石墨綠', '玫瑰金']
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
        }
      },
      modalTitle: '',
      viewImageSrc: '',
      isLoading: false,
      message: ''
    }
  },
  filters: {
    commaFormat (value) {
      // 加上千分位符號
      const parts = value.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return 'NT. ' + parts.join('.')
    }
  },
  methods: {
    /* 取得遠端 API資料 */
    // 預設為 1
    getData (page = 1) {
      const vm = this
      setTimeout(() => {
        vm.isLoading = true
      }, 1000)
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`)
        .then((res) => {
          // 取得該頁資料
          vm.hexAPI.data = res.data.data
          // 取得分頁資訊
          vm.pagination = res.data.meta.pagination
          setTimeout(() => {
            vm.isLoading = false
          }, 0)
        })
    },
    /* 新增資料 */
    addData () {
      const vm = this
      vm.isLoading = true
      vm.axios
        .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product`, vm.temporary)
        .then(() => {
          vm.isLoading = false
          vm.message = '新增成功!'
          $('#noticeModal').modal('show')
          setTimeout(() => {
            $('#noticeModal').modal('hide')
          }, 1500)
          vm.getData()
        })
    },
    /* 新建資料 */
    initData () {
      this.cleanData()
      this.modalTitle = '新增商品'
      this.temporary = JSON.parse(JSON.stringify(this.product))
    },
    /* 複製資料 */
    copyData (action, item) {
      const vm = this
      vm.cleanData()
      vm.isLoading = true
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`)
        .then((res) => {
          vm.temporary = JSON.parse(JSON.stringify(res.data.data))
          vm.modalTitle = vm.temporary.title
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
      if (vm.temporary.id) {
        vm.hexAPI.data.forEach((item) => {
          if (vm.temporary.id === item.id) {
            // vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
            vm.axios
              .patch(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${vm.temporary.id}`, vm.temporary)
              .then(() => {
                vm.isLoading = false
                vm.message = '修改成功!'
                $('#noticeModal').modal('show')
                setTimeout(() => {
                  $('#noticeModal').modal('hide')
                }, 1500)
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
          // vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
          vm.axios
            .delete(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${vm.temporary.id}`)
            .then(() => {
              vm.isLoading = false
              $('#deleteProductModal').modal('hide')
              vm.message = '刪除成功!'
              $('#noticeModal').modal('show')
              setTimeout(() => {
                $('#noticeModal').modal('hide')
              }, 1500)
              vm.getData()
              vm.cleanData()
            })
        }
      })
    },
    cleanData () {
      this.temporary = {
        imageUrl: [],
        options: {
          colors: []
        }
      }
    },
    addCell (input) {
      input.push('')
    },
    removeCell (input) {
      input.pop()
    },
    viewImage (src) {
      this.viewImageSrc = src
    }
  },
  created () {
    this.getData()
  }
}
</script>
