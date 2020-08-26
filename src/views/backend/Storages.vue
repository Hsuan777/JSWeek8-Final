<template>
  <section class="container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="../../assets/Spinner-1s-177px.gif" alt="">
      </template>
    </loading>
    <notice :message="message"></notice>
    <h2 class="font-weight-bold my-5">檔案列表</h2>
    <div class="d-flex justify-content-end mb-2">
      <button
        type="button"
        class="btn btn-primary btn-lg px-3"
        data-toggle="modal"
        data-target="#addStorageModal"
        @click.prevent="initData"
      >新增檔案</button>
    </div>
    <div class="table-responsive">
      <table class="table border-bottom">
        <thead>
          <tr>
            <th scope="row" class="text-nowrap">檔案名稱</th>
            <th scope="row" width="150px">縮圖</th>
            <th scope="row" class="text-nowrap">編輯</th>
          </tr>
        </thead>
        <tbody class="p-0" v-if="hexAPI">
          <tr v-for="(item) in hexAPI.data" :key="item.id">
            <td class="align-middle">{{item.id}}</td>
            <td class="align-middle">
              <img :src="item.path" alt="" class="img-fluid">
            </td>
            <td class="pr-0">
              <button
                class="btn btn-outline-danger mr-0"
                @click.prevent="copyData(item)"
                data-target="#deleteStorageModal"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <pagination :pages="pagination" @emit-pages="getData"></pagination>
      </div>
    </div>

    <!-- add/edit Modal -->
    <div
      class="modal fade"
      id="addStorageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStorageModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white font-weight-bold">{{ modalTitle }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="#">
              <div class="form-row justify-content-center">
                <div class="form-group">
                  <label for class>商品圖片</label>
                  <!-- accept 能接受的檔案類型 -->
                  <input
                    type="file"
                    class="form-control"
                    accept="image/png, image/jpeg"
                    @change="previewFile"
                    ref="updataFile"
                  />
                </div>
                <img ref="previewImg" alt="" class="img-fluid">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="addData"
            >Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete Modal -->
    <div
      class="modal fade"
      id="deleteStorageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addStorageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white">刪除檔案</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>是否刪除這張圖片? 刪除後將無法復原 !</h3>
            <div class="d-flex justify-content-center">
              <img  :src="temporary.path" alt="" class="img-fluid">
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="deleteData"
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
import Notice from '@/components/Notice.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Notice,
    Pagination
  },
  data () {
    return {
      hexAPI: {
        data: []
      },
      temporary: {},
      previewTemporary: {
        file: '',
        src: ''
      },
      modalTitle: '',
      isLoading: false,
      message: '',
      pagination: {}
    }
  },
  methods: {
    getData (page = 1) {
      const vm = this
      setTimeout(() => {
        vm.isLoading = true
      }, 1000)
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage?page=${page}`
        )
        .then((response) => {
          vm.hexAPI.data = response.data.data
          vm.pagination = response.data.meta.pagination
          setTimeout(() => {
            vm.isLoading = false
          }, 0)
        })
    },
    previewFile () {
      const vm = this
      vm.previewTemporary.file = vm.$refs.updataFile.files[0]
      // 使用 FileReader()，並建立監聽事件 load
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        vm.previewTemporary.src = reader.result
        vm.$set(vm.$refs.previewImg, 'src', vm.previewTemporary.src)
      })
      // readAsDataURL，會將指定的檔案轉成 base64後並觸發監聽事件
      // reader.result就會有結果
      reader.readAsDataURL(vm.previewTemporary.file)
    },
    /* 新增資料 */
    addData () {
      const vm = this
      vm.isLoading = false
      if (vm.previewTemporary.file) {
        const formData = new FormData()
        vm.isLoading = true
        $('#addStorageModal').modal('hide')
        formData.append('file', vm.previewTemporary.file)
        vm.axios
          .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`, formData)
          .then(() => {
            vm.getData()
            vm.cleanData()
          })
      } else {
        $('#addStorageModal').modal('hide')
        vm.message = '請先加入檔案!'
        $('#noticeModal').modal('show')
        setTimeout(() => {
          $('#noticeModal').modal('hide')
        }, 1500)
      }
    },
    /* 新建檔案 */
    initData () {
      this.previewTemporary = {
        file: '',
        src: ''
      }
      this.modalTitle = '新增檔案'
    },
    /* 複製資料 */
    copyData (item) {
      const vm = this
      vm.temporary = item
      vm.modalTitle = '是否刪除此筆檔案 ? '
      $('#deleteStorageModal').modal('show')
    },
    /* 刪除檔案 */
    deleteData () {
      const vm = this
      vm.isLoading = true
      vm.hexAPI.data.forEach((item) => {
        if (vm.temporary.id === item.id) {
          vm.axios
            .delete(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage/${vm.temporary.id}`)
            .then(() => {
              vm.getData()
              vm.cleanData()
            })
        }
      })
    },
    cleanData () {
      this.temporary = {}
    }
  },
  created () {
    this.getData()
  }
}
</script>
