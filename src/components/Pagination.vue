<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mx-auto">
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
  name: 'Pagination',
  // 原本是用陣列，若要指令細節，則是用物件，並將自訂名稱作為屬性名稱
  props: {
    pages: {
      type: Object
      // validator:,
      // default:``,
    }
  },
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
