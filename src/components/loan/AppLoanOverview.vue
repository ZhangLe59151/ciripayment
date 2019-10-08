<template>
  <div
    class="app-loan-overview"
  >
    
    <div class="enter-loan-amount">
      <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        label-position="top"
        class="elForm"
      >
        <el-card class="box-card">
          <el-form-item
            :label="$t('EnterLoanAmount.question')"
            prop="loanAmount"
            :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },
            ]"
          >
            <el-input
              inputmode="numeric"
              v-model="form.loanAmount"
              maxlength="11"
              @input="formatCurrency"
            >
              <div
                class="currency"
                slot="suffix"
              >{{$store.state.currency}}</div>
            </el-input>
          </el-form-item>
          <van-button
            size="small"
            class="bottom-btn"
            @click="handleStart"
            :disabled="this.form.loanAmount === '' || parseInt(this.form.loanAmount.replace(/,/g, '')) === 0"
          >{{$t("AppLoanOverview.applyNow")}}</van-button>
          <div class="consent-agreement">{{$t("AppLoanOverview.consent")}}</div>
        </el-card>

      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util";

export default {
  name: "AppLoanOverview",
  data() {
    return {
      showPopUp: false,
      form: {
        loanAmount: ""
      }
    };
  },
  computed: {
    ...mapState({
      creditLimit: state => state.credit.currentCreditLimit,
      loanProfile: state => state.loanProfile,
      OTPVerified: "OTPVerified"
    })
  },
  created() {
    if (this.$route.query.justSubmitted) {
      setTimeout(() => (this.showPopUp = true), 300);
    }
    setTimeout(() => (this.showPopUp = false), 2000);
  },
  methods: {
    checkInvalidAmount() {
      console.log(this.form.loanAmount, parseInt(this.form.loanAmount.replace(/,/g, "")) === 0);
      return parseInt(this.form.loanAmount.replace(/,/g, "")) === 0;
    },
    handleStart() {
      // update Loan Amount
      event.preventDefault();
      this.$store.commit("UpdateForm", {
        loanAmount: parseInt(this.form.loanAmount.replace(/,/g, ""))
      });
      if (!this.OTPVerified) {
        this.$router.push({
          name: "LoginPage",
          query: { to: "EnterLoanInfo", origin: this.$route.query.origin }
        });
        return false;
      }
      this.$api.verifyLoanApplyAble().then(res => {
        if (res.data.code === 200) {
          (res.data.data.verifyResult) ? this.$router.push({ name: "EnterLoanInfo", query: this.$route.query })
            : this.$router.push({ name: "LoanAmountExceedLimitError" });
        } else {
          this.$notify(res.data.msg);
        }
      });
    },
    formatTime(time, withHour = false) {
      return util.convertUTCTimeToBuddhistTime(time, withHour);
    },
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
      this.form.loanAmount = val;
      // send updated string to input
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-loan-overview {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .banner {
    height: 120px;
    background: url("../../assets/imgs/loan.png") no-repeat;
    background-size: cover;
    color: #363f47;
    text-align: center;
    padding: 26px 0px 45px 0px;
    box-sizing: border-box;
    .banner-title {
      font-size: 20px;
      font-weight: bold;
      width: 175px;
      margin-left: calc(50vw - 87px);
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
    margin-bottom: -15px;
    .lower-rate {
      position: absolute;
      top: 28px;
      left: 10vw;
      .iconcheck {
        color: #62cd7b;
        top: -17px;
        left: 26px;
        position: absolute;
      }
    }
    .higher-limit {
      position: absolute;
      top: 28px;
      left: 38vw;
      .iconcheck {
        color: #62cd7b;
        top: -17px;
        left: 26px;
        position: absolute;
      }
    }
    .faster-approval {
      position: absolute;
      top: 28px;
      left: 65vw;
      .iconcheck {
        color: #62cd7b;
        top: -17px;
        left: 37px;
        position: absolute;
      }
    }
  }

  .instruction {
    padding: 0 16px 22px 16px;
    color: #2f3941;
    font-size: 16px;
    .instruction-title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #363f47;
    }
    .instruction-content-1,
    .instruction-content-2,
    .instruction-content-3 {
      line-height: 22px;
      margin-bottom: 20px;
      font-size: 16px;
    }
    ul {
      list-style-type: disc;
      list-style-position: inside;
      li span {
        position: relative;
        left: -10px;
      }
    }

    .instruction-qs {
      margin-bottom: 8px;
    }
    .requirements{
      margin-bottom: 16px;
      .iconidcard{
        color: #ffa702;
        margin-right: 5px;
      }
    }
    .instruction-msg{
      line-height: 22px;
    }
  }
  .loan-terms {
    background-color: #e9ebed;
    flex-grow: 1;
    padding: 20px 16px 50px 16px;
    color: #68737d;
    .loan-terms-title {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 22px;
    }
    .loan-terms-content-1,
    .loan-terms-content-2,
    .loan-terms-content-3 {
      font-size: 14px;
    }
    .loan-terms-content-2,
    .loan-terms-content-3 {
      margin-top: 8px;
    }
    .loan-terms-content-3 {
      margin-bottom: 32px;
    }
    .bottom-btn {
      background-color: #ffa702;
      border-radius: 4px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      margin-bottom: 12px;
    }
    .consent-agreement {
      text-align: center;
      font-size: 10px;
      color: #68737d;
      margin-bottom: 12px;
    }
  }

  .enter-loan-amount {
    background-color: #e9ebed;
    flex-grow: 1;
    padding: 10px 0 60px 0;
    .bottom-btn {
      background-color: #ffa702;
      border-radius: 4px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .consent-agreement {
      text-align: center;
      font-size: 10px;
      color: #68737d;
    }
  }
  .loan-applied-wrapper {
    padding: 23px 16px 0 16px;
    color: #2f3941;
    .loan-heading {
      font-size: 16px;
      font-weight: bold;
    }
    .loan-status {
      text-align: right;
      color: white;
      border-radius: 4px;
      padding: 5px 10px 5px 10px;
      font-size: 12px;
    }
    .green {
      background-color: #04a777;
    }

    .red {
      background-color: #b41800;
    }

    .gray {
      background-color: #a0b4c0;
    }

    .blue {
      background-color: #1f73b7;
    }
    .loan-details {
      border-bottom: 1px solid #d8d8d8;
      margin-top: 15px;
      padding-bottom: 15px;
      .label {
        color: #87929d;
        font-size: 12px;
      }
      .info {
        text-align: right;
        font-size: 14px;
      }
    }
    .back-to-home-btn {
      width: calc(100vw - 32px);
      font-size: 14px;
      height: 40px;
      position: fixed;
      bottom: 16px;
      left: 16px;
    }
    .success-popup {
      text-align: center;
      font-size: 13px;
      padding-top: 13px;
      padding-bottom: 13px;
      top: 44px;
      background-color: #04a777;
      color: white;
    }
  }
}
</style>

<style lang="scss">
.enter-loan-amount {
  .el-card {
    border-radius: 0;
    border: none;
  }
  .el-card__body {
    padding: 20px 16px 20px 16px;
  }
  .el-input__inner {
    font-size: 24px;
    padding-left: 0;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .el-input__suffix {
    color: #363f47;
    position: absolute;
    top: 5px;
  }
}
</style>
