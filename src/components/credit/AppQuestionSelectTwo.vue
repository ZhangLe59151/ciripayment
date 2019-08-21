<template>
  <div class="credit-question-2">
    <div class="title">What's your monthly income?</div>
            <van-field
              class="input_number"
              v-model="form.memo"
              maxlength="50"
              placeholder="5000"
            />
            <div class="curruncy">{{$store.state.currency}}</div>
            
            <div class="error_msg">Please enter an amount</div>
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

      .input_number {
        position: absolute;
        height: 82px;
        left: 16px;
        right: 16px;
        width: 90%;
        top: 130px;
        font-size: 24px;
        height: 25%;
        border-color: #B41800;
        border-style: solid;
        border-width: 1px;
        border-radius: 4px;
      }

      .curruncy {
        position: absolute;
        top: 163px;
        right: 32px;
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
