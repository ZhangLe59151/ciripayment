<template>
  <div class="splashPage">
      <div class="title">อ.ตี๋ รามัญ is calculating your fortune…</div>
  </div>
</template>

<script>
export default {
  name: "DailyFortuneLoading",
  props: {
    index: {
      default: 1,
      type: Number
    },
    questionBody: {
      default: "",
      type: String
    },
    questionSubtitle: {
      default: "",
      type: String
    },
    type: {
      default: "3"
    }
  },
  data() {
    return {
      answer: ""
    };
  },
  methods: {
    next() {
      this.$emit("submitAnswer", this.answer);
      this.answer = "";
      this.type="2";
    },
    onSelect(id) {
      this.answer = id;
    } 
  }
};
</script>

<style lang="scss" scoped>
//@import "../assets/css/bottom-btn.scss";
.splashPage {
  //background: "iconBk" no-repeat;
  background-size: cover;
  height: 100vh;

  .title{
    position: fixed;
    margin: 150px 36px 0 36px;
    color: black;
    font-size: 24px;
    text-align: center;
  }
}
</style>