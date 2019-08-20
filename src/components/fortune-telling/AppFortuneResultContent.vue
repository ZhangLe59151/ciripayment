<template>
  <div class="app-fortune-result-content">
    <div class="background-card">
      <div class="result-box">
        <div class="date">
          {{today}}
        </div>
        <div class="fortune-result">
          {{fortuneResult}}
        </div>
        <div class="sales-desc">
          Sales Target Today
        </div>
        <div class="sales-result">
          {{salesResult}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFortuneResultContent",
  props: {
    fortuneResult: {
      default: "",
      type: String
    },
    salesResult: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      today: ""
    }
  },
  mounted() {
    this.today =  this.$moment().format("DD MMM YYYY")
  }
}
</script>

<style lang="scss" scoped>
  .app-fortune-result-content {
    position: relative;
    background-color: #FF8600;
    height: 65vh;
    width: 100%;
    text-align: center;
  }
  .background-card {
    position: absolute;
    background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_result_card.png");
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .result-box {
    position: absolute;
    left: 80px;
    right: 60px;
    top: 50%;
    height: 200px;
    transform: translateY(-50%);
    .date {
      position: absolute;
      color: #2F3941;
      font-size: 16px;
      top: 0;
      width: 100%;
      height: 18px;
      text-align: center;
    }
    .fortune-result {
      position: absolute;
      color: #2F3941;
      font-size: 24px;
      top: 50px;
      width: 100%;
      height: 100px;
      text-align: center;
      overflow: scroll;
    }
    .sales-desc {
      position: absolute;
      color: #68737D;
      font-size: 14px;
      top: 150px;
      width: 100%;
      height: 16px;
      text-align: center;
    }
    .sales-result {
      position: absolute;
      color: black;
      font-size: 24px;
      top: 176px;
      width: 100%;
      height: 28px;
      text-align: center;
    }
  }

</style>
