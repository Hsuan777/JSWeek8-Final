<template>
  <section class="container">
    <div class="d-flex align-items-center">
      <h2 class="font-weight-bold d-flex justify-content-between mr-3 my-5">優惠券列表</h2>
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="d-flex justify-content-end mb-2">
      <button
        type="button"
        class="btn btn-primary btn-lg px-3"
        data-toggle="modal"
        data-target="#addCouponModal"
        @click="initData"
      >新增優惠券</button>
    </div>
    <div class="table-responsive">
      <table class="table border-bottom">
        <thead>
          <tr>
            <th scope="row" class="text-nowrap">優惠券名稱</th>
            <th scope="row" width="300px">序號</th>
            <th scope="row" width="100px" class="text-right text-nowrap">折扣百分比</th>
            <th scope="row" width="300px" class="text-nowrap">到期日</th>
            <th scope="row" width="150px" class="text-center text-nowrap">是否開放</th>
            <th scope="row" class="text-nowrap">編輯</th>
          </tr>
        </thead>
        <tbody class="p-0">
          <tr v-for="(item) in hexAPI.data" :key="item.id">
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle">{{ item.code }}</td>
            <td class="text-right align-middle">{{ item.percent }}</td>
            <td class="align-middle">{{ item.deadline.datetime }}</td>
            <td class="text-center align-middle">
              <span v-if="item.enabled" class="text-success">已開放</span>
              <span v-else class="text-danger">未開放</span>
            </td>
            <!-- <td class="pr-0">
              <button
                class="btn btn-secondary mr-2"
                @click="copyData(item)"
                data-toggle="modal"
                data-target="#addProductModal"
              >修改</button>
              <button
                class="btn btn-outline-danger mr-0"
                @click="copyData(item)"
                data-toggle="modal"
                data-target="#deleteProductModal"
              >刪除</button>
            </td> -->
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

    <!-- add/edit Modal -->
    <div
      class="modal fade"
      id="addCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addProductModalLabel"
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
              <div class="form-row">
                <div class="col-12">
                  <div class="form-group">
                    <label>優惠券名稱</label>
                    <input
                      type="text"
                      placeholder="優惠券名稱"
                      class="form-control"
                      v-model="temporary.title"
                    />
                  </div>
                  <div class="form-row justify-content-between">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="code">序號</label>
                        <input
                          type="text"
                          id="code"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          class="form-control"
                          v-model="temporary.code"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="percent">折扣百分比</label>
                        <input
                          type="number"
                          id="percent"
                          placeholder
                          class="form-control"
                          v-model="temporary.percent"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label for="deadline_at" class>到期日</label>
                        <input
                          type="text"
                          id="deadline_at"
                          placeholder="到期日"
                          class="form-control"
                          v-model="temporary.deadline_at"
                        />
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
                    <label for="isUp" class="form-check-label">是否開啟</label>
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
      id="deleteCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addCouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white font-weight-bold">刪除優惠券</h5>
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
              class="btn btn-primary"
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
export default {
  data () {
    return {
      hexAPI: {
        data: {}
      },
      coupon: {
        title: '振興三倍速',
        code: 'code871',
        percent: 10,
        enabled: true,
        // TODO: 格式化時間
        deadline_at: '2020-12-31 23:23:59'
      },
      temporary: {},
      modalTitle: '',
      isLoading: false
    }
  },
  props: ['token'],
  methods: {
    getData () {
      const vm = this
      vm.isLoading = true
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons`
        )
        .then((response) => {
          vm.hexAPI.data = response.data.data
          vm.isLoading = false
        })
    },
    /* 新增資料 */
    addData () {
      const vm = this
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`, vm.temporary)
        .then(() => {
          vm.getData()
        })
    },
    /* 新建資料 */
    initData () {
      this.modalTitle = '新增優惠券'
      this.temporary = Object.assign({}, this.coupon)
    },
    /* 複製資料 */
    copyData (action, item) {
      const vm = this
      vm.isLoading = true
      vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`)
        .then((res) => {
          vm.temporary = Object.assign({}, res.data.data)
          vm.modalTitle = vm.temporary.title
          vm.isLoading = false
          if (action === 'edit') {
            $('#addCouponModal').modal('show')
          } else if (action === 'delete') {
            $('#deleteCouponModal').modal('show')
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
            vm.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`
            vm.axios
              .patch(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.temporary.id}`, vm.temporary)
              .then(() => {
                vm.getData()
                vm.cleanData()
                vm.modalTitle = vm.temporary.title
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
            .delete(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.temporary.id}`)
            .then(() => {
              vm.getData()
              vm.cleanData()
              vm.isLoading = false
            })
        }
      })
    },
    // 工具類 //
    cleanData () {
      this.temporary = {}
    }
  },
  created () {
    this.getData()
  }
}
</script>
