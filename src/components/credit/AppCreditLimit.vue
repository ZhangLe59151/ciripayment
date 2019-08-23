<template>
  <div class="app-credit-limit">
    <div v-bind:class="creditLimitClass">
      <div class="credit-limit-title">Your Business Is Currently Worth</div>
      <credit-app-number-counting
        :numberTo="numberTo"
        class="credit-limit-amount"
      />

    </div>
    <div class="ribbon">
      <div class="ribbon-text">
        Earn credit by answering questions everyday!
      </div>
    </div>

<!--      <div class="credit-instruction">Earn credit by answering questions everyday!</div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppCreditLimit",
  data() {
    return {
      numberTo: 100000,
      creditLimitClass: "credit-limit answered-none"
    };
  },
  computed: {
    ...mapState({
      creditLimit: state => state.credit.currentCreditLimit,
      // creditAnswers: state => state.credit.questions.map(question => question.value),
      creditAnswers: state =>
        (Array.isArray(state.credit.questions)) ? state.credit.questions.map(item => item.value) : []
    })
  },
  watch: {
    creditLimit: function(newVal, oldVal) {
      this.numberTo = newVal;
      this.creditLimitClass = this.returnStateBasedOnAnswered(
        this.creditAnswers
      );
    }
  },
  created() {
    this.creditLimitClass = this.returnStateBasedOnAnswered(this.creditAnswers);
  },
  methods: {
    returnStateBasedOnAnswered(answers) {
      let numberOfAnswered = answers.filter(Boolean).length;
      switch (numberOfAnswered) {
        case 1: {
          return "credit-limit answered-one";
        }
        case 2: {
          return "credit-limit answered-two";
        }
        case 3: {
          return "credit-limit answered-three";
        }
        default: {
          return "credit-limit answered-none";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-credit-limit {
  color: #363f47;
  .answered-none {
    background: url("../../assets/imgs/money_background_0.png") no-repeat;
    background-size: 100% 100%;
  }
  .answered-one {
    background: url("../../assets/imgs/money_background_1.png") no-repeat;
    background-size: 100% 100%;
  }
  .answered-two {
    background: url("../../assets/imgs/money_background_2.png") no-repeat;
    background-size: 100% 100%;
  }
  .answered-three {
    background: url("../../assets/imgs/money_background_3.png") no-repeat;
    background-size: 100% 100%;
  }
  .credit-limit {
    height: 136px;
    width: 100%;
    text-align: center;
    padding: 20px 0 20px 0;
    font-weight: bold;
    box-sizing: border-box;
    .credit-limit-title {
      font-size: 16px;
    }
    .credit-limit-amount {
      margin-top: 4px;
      font-size: 32px;
    }
  }
  .ribbon {
    height: 60px;
    background: url("../../assets/imgs/ribbon.png") no-repeat;
    background-size: cover;
    position: relative;
    top: -35px;
    color: white;
    font-size: 13px;
    margin-bottom: -45px;
    .ribbon-text {
      font-size: 14px;
      position: relative;
      top: 20px;
      text-align: center;
    }
  }
  .credit-instruction-wrapper {
    padding: 6px 16px 6px 16px;
    height: 40px;
    text-align: center;
    background-image: linear-gradient(269deg, #d46531 0%, #d44832 100%);
    .credit-instruction {
      font-size: 14px;
      font-weight: bold;
      color: white;
      position: relative;
      top: 11px;
    }
  }
  .scaleBig {
    font-size: 35px;
  }
}
</style>
