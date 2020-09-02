<template>
  <section class="container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
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
          <div class="modal-header bg-secondary">
            <h5 class="modal-title font-weight-bold">{{ modalTitle }}</h5>
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
                    accept="image/png, image/jpeg, image/gif"
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
            <button type="button" class="btn btn-primary" @click.prevent="addData">Save</button>
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
          <div class="modal-header bg-secondary">
            <h5 class="modal-title text-danger">刪除檔案</h5>
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
              class="btn btn-outline-danger"
              @click.prevent="deleteData"
              data-dismiss="modal"
            >Delete</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
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
  components: {
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
      vm.isLoading = true
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage?page=${page}`
        )
        .then((response) => {
          vm.hexAPI.data = response.data.data
          vm.pagination = response.data.meta.pagination
          vm.isLoading = false
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
      if (vm.previewTemporary.src) {
        console.log(vm.previewTemporary)
        const formData = new FormData()
        vm.isLoading = true
        $('#addStorageModal').modal('hide')
        formData.append('file', vm.previewTemporary.file)
        vm.axios
          .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`, formData)
          .then(() => {
            vm.isLoading = false
            vm.$swal({
              icon: 'success',
              title: '新增成功',
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (!result.value) {
                vm.getData()
              }
            })
          })
          .catch((error) => {
            vm.isLoading = false
            vm.$swal({
              icon: 'error',
              title: '新增失敗',
              text: `${error.message}`,
              confirmButtonText: '確定'
            }).then((result) => {
              if (result.value) {
                vm.getData()
              }
            })
          })
        vm.cleanImage()
      } else {
        $('#addStorageModal').modal('hide')
        vm.$swal({
          icon: 'info',
          title: '請先加入檔案',
          confirmButtonText: '確定'
        }).then((result) => {
          if (result.value) {
            $('#addStorageModal').modal('show')
          }
        })
      }
    },
    /* 新建檔案 */
    initData () {
      this.cleanImage()
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
              vm.isLoading = false
              vm.$swal({
                icon: 'success',
                title: '刪除成功',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                if (!result.value) {
                  vm.getData()
                  vm.temporary = {}
                }
              })
            })
            .catch((error) => {
              vm.isLoading = false
              vm.$swal({
                icon: 'error',
                title: '刪除失敗',
                text: `${error.message}`,
                confirmButtonText: '確定'
              }).then((result) => {
                if (result.value) {
                  vm.getData()
                  vm.temporary = {}
                }
              })
            })
        }
      })
    },
    cleanImage () {
      this.previewTemporary = {
        file: '',
        src: ''
      }
      this.$refs.updataFile.value = ''
      this.$set(this.$refs.previewImg, 'src', '')
    }
  },
  created () {
    this.getData()
  }
}
</script>
