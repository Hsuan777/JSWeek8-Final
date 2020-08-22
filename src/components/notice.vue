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
          <div class="modal-header bg-primary">
            <h3 class="d-flex align-items-center">
              通知<span class="material-icons ml-1">notification_important</span>
            </h3>
          </div>
          <div class="modal-body d-flex flex-column align-items-center">
            <h3 class="mb-3">{{ message }}</h3>
            <button type="button" class="btn btn-secondary" aria-label="Close" @click="jump(jumpTo)">確定</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  props: ['message', 'jumpTo'],
  methods: {
    jump (jumpTo) {
      this.$router.push(jumpTo)
      $('#noticeModal').modal('hide')
      setTimeout(() => {
        $('#noticeModal').modal('hide')
      }, 1000)
    }
  }
}
</script>
