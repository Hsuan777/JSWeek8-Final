<template>
  <div
      class="modal fade"
      id="noticeModal"
      ref="noticeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="noticeModal"
      aria-hidden="true"
    >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column align-items-center">
          <div class="icon__notice d-flex justify-content-center align-items-center">
            <span class="material-icons h2 text-primary">notification_important</span>
          </div>
          <h3 class="d-flex align-items-center mb-5">
            {{ message }}
          </h3>
          <!-- <button type="button" class="btn btn-secondary" aria-label="Close" @click="jump">確定</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  props: ['message']
  // methods: {
  //   jump () {
  //     this.$router.push(jumpTo)
  //     $('#noticeModal').modal('hide')
  //   }
  // }
}
</script>
