<template>
  <section  class="container mt-6">
    <loading :active.sync="isLoading"></loading>
    <h2>{{ hexAPI.product.title }}</h2>
    <img :src="hexAPI.product.imageUrl[0]" class="img-fluid rounded-top">
    <p>{{ hexAPI.product.content }}</p>
  </section>
</template>

<script>
export default {
  data () {
    return {
      hexAPI: {
        product: {}
      },
      product: {
        id: {}
      },
      isLoading: false
    }
  },
  methods: {
    getProduct (pid) {
      const vm = this
      vm.isLoading = true
      vm.axios
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${pid}`
        )
        .then((response) => {
          vm.hexAPI.product = response.data.data
          vm.isLoading = false
        })
    }
  },
  created () {
    // 或許可以用 $bus
    this.getProduct(this.$route.params.id)
  }
}
</script>
