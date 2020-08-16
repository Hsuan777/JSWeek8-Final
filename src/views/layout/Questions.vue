<template>
  <section class="container">
    <h2 class="font-weight-bold text-center">常見問題</h2>
    <ul class="list-unstyled border-dark">
      <li class="question__item" @click="toggle('q1')">
        <h4  class="question__title d-flex align-items-center justify-content-between mb-0">
          Q1.請問行李箱是淘寶來的嗎？
          <span class="question__title__icon"></span>
        </h4>
        <p class="p-2 bg-secondary" v-if="isShow.q1">台灣品牌 品質有保障 通過CNS15331國家標準檢測及SGS檢驗測試合格，不是淘寶貨喔~~</p>
      </li>
      <li class="question__item" @click="toggle('q2')">
        <h4 class="question__title d-flex align-items-center justify-content-between mb-0">
          Q2.請問行李箱保固多久？
          <span class="question__title__icon"></span>
        </h4>
        <p class="p-2 bg-secondary" v-if="isShow.q2">三年保固維修，一年破箱免費換(需提正本航空破箱證明)。</p>
      </li>
      <!-- <li class="question__item">
        <h4 class="question__title d-flex align-items-center justify-content-between mb-0">
          Q3.請問行李箱材質是甚麼 ？
          <span class="question__title__icon"></span>

        </h4>
        <p class="p-2 bg-secondary" >採用優質ABS+PC塑料材質，此材質具高韌性，鋁合金防護角，耐摔、耐撞</p>
      </li>
      <li class="question__item">
        <h4 class="question__title d-flex align-items-center justify-content-between mb-0">
          Q4.請問行李箱的零件都有甚麼？
          <span class="question__title__icon"></span>
        </h4>
        <p class="p-2 bg-secondary" >鋁合金拉杆，鋁和合金防護包腳，多面提把設計，360度萬向靜音輪，360度滑順好推，國際標準TSA海關鎖。</p>
      </li>
      <li class="question__item">
        <h4 class="question__title d-flex align-items-center justify-content-between border-bottom-none mb-0">
          Q5.請問維修師傅很有經驗嗎？
          <span class="question__title__icon"></span>
        </h4>
        <p class="p-2 bg-secondary" >我們的維修師傅經驗豐富，也因此行李箱維修不分廠牌並且懂行李箱材質好壞，找我們維修不須擔心才剛維修就壞掉喔~!</p>
      </li> -->
    </ul>
  </section>
</template>
<script>
// import $ from 'jquery'
export default {
  data () {
    return {
      isShow: {
        q1: false,
        q2: false
      }
    }
  },
  methods: {
    toggle (question) {
      console.log(question)
      switch (question) {
        case 'q1':
          this.isShow.q1 = !this.isShow.q1
          break
        case 'q2':
          this.isShow.q2 = !this.isShow.q2
          break
      }
      // this.isShow[num] = !this.isShow[num]
      // $('.bg-secondary').fadeIn('slow').toggle()
    }
  }
}
</script>
