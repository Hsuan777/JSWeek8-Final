<template>
  <aside>
    <button
        type="button"
        class="top top__shoppingCart btn btn-secondary btn-lg text-decoration-none d-flex p-2"
        data-toggle="modal"
        data-target="#shoppingModal"
      >
      <span class="material-icons text-white">shopping_cart</span>
      <span class="icon__cartNum text-white">{{ shopping.data.length }}</span>
    </button>
    <!-- shopping Modal -->
    <div
      class="modal fade"
      id="shoppingModal"
      ref="shoppingModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="shoppingModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 class="modal-title font-weight-bold ml-1">您的購物清單</h5>
            <button type="button" class="close mr-1 pr-0" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 元件內要使用 loading，必須放在該元件樣板的元素中 -->
             <loading :active.sync="isLoading">
              <template slot="default">
                <img src="../assets/Spinner-1s-177px.gif" alt="">
              </template>
            </loading>
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th>商品</th>
                  <th class="text-center">數量</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in shopping.data" :key="index">
                  <td class="align-middle">
                    <span class="text-primary">{{ item.product.title }}</span>
                    <span class="d-block">{{ item.product.price|commaFormat }}</span>
                  </td>
                  <td class="align-middle text-center">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-outline-secondary text-dark" @click.prevent="productQuantity('reduce', item.product.id, item.quantity)"> - </button>
                      <input type="button" class="btn btn-outline-secondary text-dark" :value="item.quantity">
                      <button type="button" class="btn btn-outline-secondary text-dark" @click.prevent="productQuantity('add', item.product.id, item.quantity)"> + </button>
                    </div>
                  </td>
                  <td class="align-middle text-right pr-0">
                    <button
                      type="button"
                      class="close mr-1"
                      @click="deleteShopping( item.product.id )"
                    >
                      <span class="material-icons">delete_forever</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 class="text-right mr-2 mb-2">總計金額 : {{ shopping.moneyTotal|commaFormat }}</h3>
            <div class="modal-footer d-flex justify-content-between border-0 p-1">
              <button type="button" class="btn btn-secondary btn-lg" @click="deleteAll">Clean</button>
              <button type="button" class="btn btn-info btn-lg" @click.prevent="pay">結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      temporary: {},
      isLoading: false
    }
  },
  props: {
    shopping: {
      type: Object
    }
  },
  filters: {
    commaFormat (value) {
      const parts = value.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return 'NT. ' + parts.join('.')
    }
  },
  methods: {
    getShopping () {
      const vm = this
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
        )
        .then((response) => {
          vm.shopping.data = response.data.data
          let total = 0
          vm.shopping.data.forEach((item) => {
            total += item.product.price * item.quantity
          })
          vm.shopping.moneyTotal = total
          vm.isLoading = false
        })
    },
    productQuantity (action, pid, quantity) {
      const vm = this
      vm.isLoading = true
      vm.temporary.product = pid
      vm.temporary.quantity = quantity
      switch (action) {
        case 'add':
          vm.temporary.quantity += 1
          break
        case 'reduce':
          if (vm.temporary.quantity - 1 === 0) {
            vm.isLoading = false
            return
          } else {
            vm.temporary.quantity -= 1
            break
          }
      }
      if (vm.temporary.quantity !== quantity) {
        vm.axios
          .patch(
            `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`, vm.temporary
          )
          .then(() => {
            vm.getShopping()
          })
      }
    },
    deleteShopping (delID) {
      const vm = this
      vm.isLoading = true
      vm.shopping.data.forEach((item) => {
        if (delID === item.product.id) {
          vm.axios
            .delete(
              `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${delID}`
            )
            .then(() => {
              vm.getShopping()
            })
        }
      })
    },
    deleteAll () {
      const vm = this
      vm.isLoading = true
      vm.axios
        .delete(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/all/product`
        )
        .then(() => {
          vm.getShopping()
          vm.isLoading = false
          $('#shoppingModal').modal('hide')
        })
    },
    pay () {
      const vm = this
      if (vm.shopping.data.length === 0) {
        $('#shoppingModal').modal('hide')
      } else {
        vm.$router.push('/payment')
        $('#shoppingModal').modal('hide')
      }
    }
  },
  created () {
    this.getShopping()
  }
}
</script>
