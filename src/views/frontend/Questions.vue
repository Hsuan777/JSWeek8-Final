<template>
  <section class="height--100vh container">
    <h2 class="font-weight-bold">常見問題</h2>
    <ul class="list-unstyled">
      <li class="cursor--pointer border-bottom" @click="toggle('a1')">
        <h3 class="p-2 d-flex align-items-center justify-content-between mb-0">
          Q. 請問行李箱是淘寶來的嗎？
          <span class="material-icons" v-if="isShow.a1.more">expand_more</span>
          <span class="material-icons" v-if="isShow.a1.less">expand_less</span>
        </h3>
        <p class="p-2 bg-secondary rounded" v-if="isShow.a1.text">台灣品牌，品質有保障，通過CNS15331國家標準檢測及SGS檢驗測試合格，不是淘寶貨喔~!</p>
      </li>
      <li class="cursor--pointer border-bottom" @click="toggle('a2')">
        <h3 class="p-2 d-flex align-items-center justify-content-between mb-0">
          Q. 請問行李箱保固多久？
          <span class="material-icons" v-if="isShow.a2.more">expand_more</span>
          <span class="material-icons" v-if="isShow.a2.less">expand_less</span>
        </h3>
        <p class="p-2 bg-secondary rounded" v-if="isShow.a2.text">三年保固維修，一年破箱免費換(需提正本航空破箱證明)。</p>
      </li>
      <li class="cursor--pointer border-bottom" @click="toggle('a3')">
        <h3 class="p-2 d-flex align-items-center justify-content-between mb-0">
          Q. 請問行李箱材質是甚麼 ？
          <span class="material-icons" v-if="isShow.a3.more">expand_more</span>
          <span class="material-icons" v-if="isShow.a3.less">expand_less</span>
        </h3>
        <p class="p-2 bg-secondary rounded" v-if="isShow.a3.text">採用優質 ABS + PC塑料材質，此材質具高韌性，鋁合金防護角，耐摔、耐撞</p>
      </li>
      <li class="cursor--pointer border-bottom" @click="toggle('a4')">
        <h3 class="p-2 d-flex align-items-center justify-content-between mb-0">
          Q. 請問行李箱的零件都有甚麼 ？
          <span class="material-icons" v-if="isShow.a4.more">expand_more</span>
          <span class="material-icons" v-if="isShow.a4.less">expand_less</span>
        </h3>
        <p class="p-2 bg-secondary rounded" v-if="isShow.a4.text">鋁合金拉杆，鋁和合金防護包腳，多面提把設計，360度萬向靜音輪，360度滑順好推，國際標準TSA海關鎖。</p>
      </li>
      <li class="cursor--pointer" @click="toggle('a5')">
        <h3 class="p-2 d-flex align-items-center justify-content-between mb-0">
          Q. 請問維修師傅很有經驗嗎 ？
          <span class="material-icons" v-if="isShow.a5.more">expand_more</span>
          <span class="material-icons" v-if="isShow.a5.less">expand_less</span>
        </h3>
        <p class="p-2 bg-secondary rounded" v-if="isShow.a5.text">我們的維修師傅經驗豐富，也因此行李箱維修不分廠牌並且懂行李箱材質好壞，找我們維修不須擔心才剛維修就壞掉喔~!</p>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data () {
    return {
      isShow: {
        a1: {
          text: true,
          more: false,
          less: true
        },
        a2: {
          text: true,
          more: false,
          less: true
        },
        a3: {
          text: true,
          more: false,
          less: true
        },
        a4: {
          text: true,
          more: false,
          less: true
        },
        a5: {
          text: true,
          more: false,
          less: true
        }
      }
    }
  },
  methods: {
    toggle (ans) {
      this.isShow[ans].text = !this.isShow[ans].text
      this.isShow[ans].more = !this.isShow[ans].more
      this.isShow[ans].less = !this.isShow[ans].less
    }
  }
}
</script>
