<template>
  <div class="app-credit-limit">
    <div class="credit-limit">
      <div class="credit-limit-title">Your Current Credit Limit:</div>
      <div class="credit-limit-amount">{{formatCurrency(creditLimit)}} {{$store.state.currency}}</div>
    </div>
    <div class="credit-question-wrapper">
      <div class="credit-question">Want more credit?</div>
      <div class="credit-question-instruction">Complete the tasks below to earn more credit immediately:</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppCreditLimit",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      creditLimit: state => state.userInfo.creditLimit
    })
  },
  methods: {
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
      val = String(val);
      // don't validate empty input
      if (val === "") {
        return;
      }

      // check for decimal
      if (val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimalPos = val.indexOf(".");

        // split number by decimal point`
        var leftSide = val.substring(0, decimalPos);
        var rightSide = val.substring(decimalPos);

        // add commas to left side of number
        leftSide = this.formatNumber(leftSide);

        // validate right side
        rightSide = this.formatNumber(rightSide);

        // Limit decimal to only 2 digits
        rightSide = rightSide.substring(0, 2);

        // join number by .
        val = leftSide + "." + rightSide;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        val = this.formatNumber(val);
      }
      // send updated string to input
      return val;
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-credit-limit{
    background-color: #E9EBED;
    color: #363F47;
    .credit-limit{
      background-color: #ffffff;
      height: 101px;
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
    .credit-question-wrapper {
      padding: 20px 16px 16px 16px;
      .credit-question {
        font-size: 20px;
        font-weight: bold;
      }
      .credit-question-instruction{
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }

</style>
