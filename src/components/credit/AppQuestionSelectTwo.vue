<template>
  <div class="box-card">
        <div class="title">What's your monthly income?</div>
        <div class="option-block">
          <button class="option">0</button>
          <button class="option">1</button>
        <!--   <button class="option">2</button>
          <button class="option">3</button>
          <button class="option">4</button>
          <button class="option">5+</button> -->
        </div>
        <van-button class="submit-btn">+1,000 B criedit</van-button>
  </div>
</template>

<script>
export default {
  name: "AppQuestionSelectTwo",
  created() {
    // this.$store.commit("fetchCreditDataFromLocal");
    // fetch credit from server or userphone:
    let credit = {
      creditLimit: 5000,
      creditQuestions: {
        Q1: "What's your monthly income",
        Q2: "What's your monthly expenses",
        Q3: "Whats your favourite restaurant"
      },
      creditAnswers: {
        Q1: "",
        Q2: "",
        Q3: ""
      }
    };
    this.$store.commit("InitCredit", credit);
  }
}
</script>

<style lang="scss" scoped>
  .box-card{
      background-color: #ffffff;
      margin: 16px 6px 0 28px;
      height: 340px;
      border-radius: 10px;
      position: relative;

      .title{
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        position: absolute;
        left: 30px;
        right: 30px;
        top: 30px;
      }

      .option-block {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 30%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          width: 45%;
          height: 40%;
          margin: 4px 6px 4px 6px;
        }
      }
      
      .submit-btn{
        position: absolute;
        background: #FF8600;
        border-radius: 4px;
        left: 16px;
        right: 16px;
        width: 90%;
        height: 40px;
        color: white;
        font-size: 14px;
        line-height: 40px;
        bottom: 20px;
      }
    }
</style>
