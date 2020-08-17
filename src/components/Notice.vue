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
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body d-flex flex-column align-items-center">
            <h3 class="mb-3">{{ message }}</h3>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close" @click="jump">確定</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'Notice',
  data () {
    return {
    }
  },
  props: ['message'],
  methods: {
    jump () {
      this.$router.push('/products')
      $('#noticeModal').modal('hide')
    }
  }
}
</script>
