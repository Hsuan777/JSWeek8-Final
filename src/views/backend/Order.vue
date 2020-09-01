<template>
  <section class="container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <notice :message="message"></notice>
    <h2 class="font-weight-bold my-5">訂單</h2>
    <div class="table-responsive">
      <table class="table border-bottom">
        <thead>
          <tr>
            <th scope="row" class="text-nowrap">訂單時間</th>
            <th scope="row" width="300px">訂購產品</th>
            <th scope="row" class="text-nowrap text-right">訂單金額</th>
            <th scope="row" class="text-nowrap">付款狀態</th>
            <!-- 編輯訂單，出貨狀態、維修狀態 -> 只能修改是否結帳 -->
            <th scope="row" class="text-nowrap">查看訂單</th>
          </tr>
        </thead>
        <tbody class="p-0">
          <tr v-for="(item) in hexAPI.data" :key="item.id">
            <td class="align-middle">{{ item.created.datetime }}</td>
            <td class="align-middle">{{ item.products[0].product.title }}</td>
            <td class="align-middle text-right">{{ item.amount }}</td>
            <td class="align-middle">
              <span v-if="item.paid" class="text-success">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
            <td class="pr-0">
              <div class="btn-group">
                <button
                  class="btn btn-secondary"
                  @click.prevent="copyData(item)"
                >編輯</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- edit Modal -->
    <div
      class="modal fade"
      id="editOrderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editOrderModalLabel"
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
          <div class="modal-body" v-if="temporary.user">
            <form action="#">
              <div class="form-row">
                <div class="col-12">
                  <div class="form-group">
                    <label>訂購人</label>
                    <input
                      type="text"
                      :placeholder="temporary.user.name"
                      class="form-control"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>訂購人地址</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="temporary.user.address"
                      disabled
                    />
                  </div>
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="isUp"
                      class="form-check-input"
                      v-model="temporary.paid"
                    />
                    <label for="isUp" class="form-check-label">付款狀態</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="isPaid(temporary.paid)">更新付款</button>
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
export default {
  components: {
    Notice
  },
  data () {
    return {
      hexAPI: {
        data: []
      },
      temporary: {},
      modalTitle: '',
      message: '',
      isLoading: false
    }
  },
  methods: {
    getData () {
      const vm = this
      setTimeout(() => {
        vm.isLoading = true
      }, 1000)
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders`
        )
        .then((response) => {
          vm.hexAPI.data = response.data.data
          setTimeout(() => {
            vm.isLoading = false
          }, 0)
        })
    },
    /* 複製資料 */
    copyData (item) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`)
        .then((res) => {
          vm.temporary = { ...res.data.data }
          vm.modalTitle = vm.temporary.user.name
          vm.isLoading = false
          $('#editOrderModal').modal('show')
        })
    },
    isPaid (item) {
      const vm = this
      $('#editOrderModal').modal('hide')
      let paid = ''
      if (item) {
        paid = 'paid'
      } else {
        paid = 'unpaid'
      }
      if (vm.temporary.id) {
        vm.hexAPI.data.forEach((item) => {
          if (vm.temporary.id === item.id) {
            vm.axios
              .patch(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${vm.temporary.id}/${paid}`, vm.temporary.id)
              .then(() => {
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
      }
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
