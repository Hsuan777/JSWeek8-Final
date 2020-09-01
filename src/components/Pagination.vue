<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mx-auto" v-if="pages.total_pages != 1">
      <li class="page-item" v-if="pages.current_page != 1">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPages(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(item, index) in pages.total_pages" :key="index">
        <a class="page-link text-info" href="#" @click.prevent="emitPages(item)">
          {{ item }}
        </a>
      </li>
      <li class="page-item" v-if="pages.current_page != pages.total_pages">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pages: {
      type: Object
    }
  },
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
