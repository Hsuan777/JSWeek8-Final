<template>
  <section class="container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <h2 class="font-weight-bold my-5">優惠券列表</h2>
    <div class="d-flex justify-content-end mb-2">
      <button
        type="button"
        class="btn btn-primary btn-lg px-3"
        data-toggle="modal"
        data-target="#addCouponModal"
        @click.prevent="initData"
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
            <td class="pr-0">
              <div class="btn-group">
                <button
                  class="btn btn-secondary"
                  @click.prevent="copyData('edit', item)"
                >修改</button>
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="copyData('delete', item)"
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
                        <!-- <input
                          type="text"
                          id="deadline_at"
                          placeholder="到期日"
                          class="form-control"
                          v-if="temporary.deadline"
                          v-model="temporary.deadline.datetime"
                        /> -->
                        <date-picker v-model="temporary.deadline_at" type="datetime" value-type="format" format="YYYY-MM-DD HH:mm:ss" placeholder="到期時間" v-if="temporary" ref="testTime"></date-picker>
                        <!-- <date-picker v-model="temporary.deadline_at" type="datetime" :placeholder="temporary.deadline_at" v-if="temporary.deadline_at"></date-picker> -->
                        <!-- <input
                          type="text"
                          id="deadline_at"
                          placeholder="到期日"
                          class="form-control"
                          v-if="temporary.deadline_at"
                          v-model="temporary.deadline_at"
                        /> -->
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
              @click.prevent="updateData"
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
          <div class="modal-header bg-secondary">
            <h5 class="modal-title text-danger">刪除優惠券</h5>
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  data () {
    return {
      hexAPI: {
        data: {}
      },
      dateTimeline: '',
      coupon: {
        title: '振興三倍速',
        code: 'code871',
        percent: 10,
        enabled: true,
        // TODO: 格式化時間
        deadline_at: '2020-12-31 23:59:59'
      },
      temporary: {},
      modalTitle: '',
      isLoading: false
    }
  },
  methods: {
    getData () {
      const vm = this
      vm.isLoading = true
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
      vm.isLoading = true
      vm.axios
        .post(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`, vm.temporary)
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
    },
    /* 新建資料 */
    initData () {
      this.modalTitle = '新增優惠券'
      this.temporary = { ...this.coupon }
      this.temporary.deadline_at = this.$refs.testTime.$el
      console.log(this.$refs.testTime)
    },
    /* 複製資料 */
    copyData (action, item) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`)
        .then((res) => {
          vm.temporary = { ...res.data.data }
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
            vm.axios
              .patch(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.temporary.id}`, vm.temporary)
              .then(() => {
                vm.isLoading = false
                vm.$swal({
                  icon: 'success',
                  title: '修改成功',
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
                  title: '修改失敗',
                  text: `${error.message}`,
                  confirmButtonText: '確定'
                }).then((result) => {
                  if (result.value) {
                    vm.getData()
                  }
                })
              })
          }
        })
      } else {
        vm.addData()
      }
      vm.temporary = {}
    },
    /* 刪除資料 */
    deleteData () {
      const vm = this
      vm.isLoading = true
      vm.hexAPI.data.forEach((item) => {
        if (vm.temporary.id === item.id) {
          vm.axios
            .delete(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.temporary.id}`)
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
                }
              })
            })
        }
      })
      vm.temporary = {}
    }
  },
  created () {
    this.getData()
  }
}
</script>
