<template>
  <div class="app-credit-limit">
    <div v-bind:class="creditLimitClass">
      <div class="credit-limit-title">Your Current Credit Limit:</div>
      <!--      <div class="credit-limit-amount">{{formatCurrency(creditLimit)}} {{$store.state.currency}}</div>-->
      <credit-app-number-counting :numberTo="numberTo" class="credit-limit-amount" />

    </div>
    <div class="credit-instruction-wrapper">
      <div class="credit-instruction">Earn credit by answering questions everyday!</div>
    </div>
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
    }
  },
  computed: {
    ...mapState({
      creditLimit: state => state.credit.creditLimit,
      creditAnswers: state => state.credit.creditAnswers
    })
  },
  watch: {
    creditLimit: function(newVal, oldVal) {
      this.numberTo = newVal;
      this.creditLimitClass = this.returnStateBasedOnAnswered(this.creditAnswers);
    }
  },
  created() {
    this.creditLimitClass = this.returnStateBasedOnAnswered(this.creditAnswers);
  },
  methods: {
    returnStateBasedOnAnswered(answers) {
      let numberOfAnswered = Object.values(answers).filter(String).length;
      switch (numberOfAnswered) {
        case 1 : {
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
}
</script>

<style lang="scss" scoped>
  .app-credit-limit{
    background-color: #E9EBED;
    color: #363F47;
    .answered-none {
      background: url("../../assets/imgs/money_background_0.png") no-repeat ;
      background-size: 100% 100%;
    }
    .answered-one {
      background: url("../../assets/imgs/money_background_1.png") no-repeat ;
      background-size: 100% 100%;
    }
    .answered-two {
      background: url("../../assets/imgs/money_background_2.png") no-repeat ;
      background-size: 100% 100%;
    }
    .answered-three {
      background: url("../../assets/imgs/money_background_3.png") no-repeat ;
      background-size: 100% 100%;
    }
    .credit-limit{
      height: 100px;
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
    .credit-instruction-wrapper {
      padding: 6px 16px 6px 16px;
      height: 40px;
      text-align: center;
      background-image: linear-gradient(269deg, #D46531 0%, #D44832 100%);
     .credit-instruction{
       font-size: 14px;
       font-weight: bold;
       color: white;
       position: relative;
       top:11px;
     }
    }
    .scaleBig {
      font-size: 35px;
    }
  }

</style>
