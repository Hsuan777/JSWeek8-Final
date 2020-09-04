<template>
  <section class="container">
    <loading :active.sync="isLoading">
      <template slot="default">
        <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lVFaRgYrO5dCfyEBJqB9Jz9OVpximp3hFlU1Wa1FxK0vEbkNMPzyoCR70gJhz7j3As6yvoJtJ3oceAGtWCv5rSTXleOyQqUed4vAYzX8e5ElrwIgukry35YQJVzDkdki.gif" alt="">
      </template>
    </loading>
    <h2 id="peopleData" class="mt-2 mb-5 font-weight-bold">顧客資訊</h2>
    <div class="row">
      <div class="col-lg-6">
        <validation-observer v-slot="{ invalid }">
          <form>
            <validation-provider
              rules="required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputName" class="h3">
                姓名
                <sup class="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="inputName"
                name="姓名"
                placeholder="訂購人姓名"
                class="form-control form-control-lg"
                :class="classes"
                v-model="person.name"
              />
              <small class="invalid-feedback">{{ errors[0] }}</small>
            </validation-provider>
            <validation-provider
              rules="email|required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputEmail" class="h3">
                信箱
                <sup class="text-danger">*</sup>
              </label>
              <input
                type="email"
                id="inputEmail"
                name="Email"
                placeholder="訂購人信箱"
                class="form-control form-control-lg"
                :class="classes"
                v-model="person.email"
              />
              <small class="invalid-feedback">{{ errors[0] }}</small>
            </validation-provider>
            <validation-provider
              rules="min:10|required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputTel" class="h3">
                電話
                <sup class="text-danger">*</sup>
              </label>
              <input
                type="tel"
                id="inputTel"
                name="電話"
                placeholder="訂購人電話"
                class="form-control form-control-lg"
                :class="classes"
                v-model="person.tel"
              />
              <small class="invalid-feedback">{{ errors[0] }}</small>
            </validation-provider>
            <validation-provider
              rules="min:6|required"
              v-slot="{ errors, classes }"
              tag="div"
              class="form-group"
            >
              <label for="inputAddress" class="h3">
                地址
                <sup class="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="inputAddress"
                name="地址"
                placeholder="訂購人地址"
                class="form-control form-control-lg"
                :class="classes"
                v-model="person.address"
              />
              <small class="invalid-feedback">{{ errors[0] }}</small>
            </validation-provider>
            <validation-provider
              rules="required"
              v-slot="{ errors }"
              tag="div"
              class="form-group"
            >
              <label for="selectPay" class="h3">
                付款方式
                <sup class="text-danger">*</sup>
              </label>
              <select name="selectPay" id="selectPay" class="form-control form-control-lg" v-model="person.payment">
                <option value disabled>請選擇付款方式</option>
                <option :value="item" v-for="(item, index) in selectPay" :key="index">{{ item }}</option>
              </select>
              <small class="invalid-feedback">{{ errors[0] }}</small>
            </validation-provider>
            <div class="form-group">
              <label for="inputRemarks" class="h3">留言</label>
              <textarea name="remarks" id="inputRemarks" cols="30" rows="10" class="form-control"></textarea>
            </div>
            <div class="d-flex justify-content-center mb-5">
              <input
                type="submit"
                class="btn btn-info btn-lg btn-block"
                value="結帳"
                :disabled="invalid"
                @click.prevent="order"
              />
            </div>
          </form>
        </validation-observer>
      </div>
      <div class="col-lg-6">
        <div class="custom__category--top sticky-top">
          <table class="table table-borderless sticky-top">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>商品預覽</th>
                <th class="text-center d-none d-md-block">數量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in shopping.data" :key="index" class="border-top">
                <td class="align-middle text-nowrap">
                  <span class="text-primary">{{ item.product.title }}</span>
                  <span class="d-block">
                    {{ item.product.price|commaFormat }} <span class="d-md-none">* {{ item.quantity }}</span>
                  </span>
                </td>
                <td class="align-middle">
                  <img :src="item.product.imageUrl[0]" alt class="inner__cartImg rounded" />
                </td>
                <td class="align-middle text-center d-none d-md-block mt-4">{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
          <h3 class="text-right mr-3">總計金額 : {{ shopping.moneyTotal|commaFormat }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      hexAPI: {
        data: []
      },
      selectPay: [
        'WebATM',
        'ATM',
        'Barcode',
        'Credit',
        'ApplePay',
        'GooglePay'
      ],
      person: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: ''
      },
      shopping: {
        data: [],
        moneyTotal: 0
      },
      isLoading: false,
      message: ''
    }
  },
  methods: {
    getShopping () {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
        )
        .then((response) => {
          vm.shopping.data = response.data.data
          let total = 0
          vm.shopping.data.forEach((item) => {
            total += item.product.price
          })
          vm.shopping.moneyTotal = total
          vm.isLoading = false
        })
    },
    order () {
      const vm = this
      vm.isLoading = true
      vm.axios
        .post(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`, vm.person
        )
        .then((response) => {
          vm.isLoading = false
          vm.$swal({
            icon: 'success',
            iconHtml: '<span class="material-icons h2 mb-0">flight_takeoff</span>',
            title: '感謝您的訂購!',
            text: '預祝您旅途愉快~',
            confirmButtonText: '確定'
          }).then((result) => {
            if (result.value) {
              vm.$router.push('/products')
            }
          })
        })
    }
  },
  created () {
    this.getShopping()
  }
}
</script>
