<template>
  <div
    v-if="!!question.value"
    class="money-input-question"
  >
    <i class="iconfont iconsuccess" />
    <div class="title">{{question.question}}</div>
    <div class="answer">{{question.value}}<div class="baht">{{$store.state.currency}}</div>
    </div>
    <van-button
      class="submit-btn-disabled"
      disabled
    >{{question.limitAmount}} {{$store.state.currency}} {{$t("Credit.earned")}}</van-button>
  </div>
  <div
    v-else
    class="money-input-question"
  >
    <div class="title">{{question.question}}</div>
    <el-form
      label-width="0px"
      :model="form"
      ref="elForm"
      size="small"
      label-position="top"
      class="elForm"
    >
      <el-form-item prop="answering">
        <el-input
          :class="error? 'input-box-error': 'input-box'"
          inputmode="numeric"
          v-model="form.answering"
          maxlength="11"
          @input="formatCurrency"
          :placeholder="question.placeholder"
        >
          <div
            class="currency"
            slot="suffix"
          >{{$store.state.currency}}</div>
        </el-input>
      </el-form-item>
    </el-form>
    <div
      v-if="error"
      class="error_msg"
    >{{$t("Credit.errorEnterAmount")}}</div>
    <van-button
      class="submit-btn"
      @click="handleSubmit"
    >
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}}</div>
      <img
        class="dollar-coin"
        src="../../assets/imgs/dollar_coin.png"
      >
    </van-button>
  </div>
</template>

<script>
export default {
  name: "MoneyInputQuestion",
  props: {
    question: Object
  },
  data() {
    return {
      form: {
        answering: ""
      },
      error: false
    };
  },
  methods: {
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
      // change to string
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
        // var rightSide = val.substring(decimalPos);
        //
        // // add commas to left side of number
        // leftSide = this.formatNumber(leftSide);
        //
        // // validate right side
        // rightSide = this.formatNumber(rightSide);
        //
        // // Limit decimal to only 2 digits
        // rightSide = rightSide.substring(0, 2);
        //
        // // join number by .
        // val = leftSide + "." + rightSide;
        val = leftSide;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        val = this.formatNumber(val);
      }
      this.form.answering = val;
      // send updated string to input
      return val;
    },
    validateInput() {
      this.error = !this.form.answering;
    },
    handleSubmit() {
      event.preventDefault();
      this.validateInput();
      if (!this.error) {
        // send to server
        // this.$store.commit("UpdateCreditLimit", this.$store.state.credit.currentCreditLimit + this.question.limitAmount);
        // this.$store.commit("UpdateCreditAnswer", { id: this.question.id, value: this.form.answering });
        this.$api
          .submitCreditAnswer({
            id: this.question.id,
            value: this.form.answering
          })
          .then(res => {
            if (res.data.code === 200) {
              // update vuex and localstorage
              this.$store.commit(
                "UpdateCreditLimit",
                this.$store.state.credit.currentCreditLimit +
                  this.question.limitAmount
              );
              this.$store.commit("UpdateCreditAnswer", {
                id: this.question.id,
                value: this.form.answering
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.money-input-question {
  background-color: #ffffff;
  min-height: 320px;
  width: calc(84vw);
  margin: auto;
  border-radius: 8px;
  color: #2f3941;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
  .iconsuccess {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #04a777;
    font-size: 24px;
  }
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 35px;
  }
  .answer {
    width: 98%;
    height: 80px;
    box-sizing: border-box;
    background-color: #e9ebed;
    padding-top: 26px;
    font-size: 24px;
    text-align: center;
    position: relative;

    .baht {
      font-size: 16px;
      position: absolute;
      right: 12px;
      bottom: 30px;
    }
  }
  .submit-btn-disabled {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #c2c8cc !important;
    color: white !important;
    opacity: 1 !important;
    box-shadow: none !important;
    font-size: 14px;
  }

  .currency {
    font-size: 16px;
    color: #2f3941;
    position: relative;
    top: 20px;
    left: -5px;
  }
  .error_msg {
    font-size: 14px;
    color: #b41800;
    text-align: center;
    width: 100%;
  }
  .input-box {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .input-box-error {
    border: 1px solid #b41800;
    border-radius: 4px;
  }
  .submit-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #ffa702;
    color: white;
    font-size: 14px;
    .btn-text {
      display: inline-block;
      vertical-align: middle;
    }
    .dollar-coin {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-left: 4px;
    }
  }
}
</style>

<style lang="scss">
.money-input-question {
  .el-input--small .el-input__inner {
    border: none;
    border-radius: 4px;
    width: 95%;
    height: 80px;
    font-size: 24px;
    color: #87929d;
    text-align: center;
  }
  .el-input {
    width: 97%;
  }
  .el-input--suffix .el-input__inner {
    padding-left: 30px;
  }
}
</style>
