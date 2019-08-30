<template>
  <div class="enter-loan-amount">
    <van-nav-bar
      @click-left="$router.back()"
      left-arrow
    />
    <div class="banner">
      <div class="banner-title">{{$t("EnterLoanAmount.title1")}}</div>
      <div class="banner-number">
        {{$t("EnterLoanAmount.title2")}}
        <span style="font-size: 32px">100,000* {{$store.state.currency}}</span>
      </div>
    </div>

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
            pattern="[0-9]*\,*\.*"
            v-model="form.loanAmount"
            @input="formatCurrency"
          >
            <div
              class="currency"
              slot="suffix"
            >{{$store.state.currency}}</div>
          </el-input>
        </el-form-item>
      </el-card>
    </el-form>

    <div class="tips">{{$t("EnterLoanAmount.warning")}}</div>

    <div class="apply-btn-wrapper">
      <van-button
        size="small"
        class="bottom-btn apply-btn"
        @click="handleApply"
        :disabled="form.loanAmount === ''"
      >{{$t("EnterLoanAmount.apply")}}</van-button>
    </div>

    <van-dialog
      v-model="dialog"
      scroll="paper"
      class="scroll-dialog"
      :showConfirmButton="false"
    >
      <div class="heading">
        <h1>{{$t("EnterLoanAmount.dialogTitle")}}</h1>
        <van-icon
          name="cross"
          @click="dialog = false"
        />
      </div>
      <div class="warning">
        <van-row>
          <van-col span="1">
            <i class="iconfont iconalert" />
          </van-col>
          <van-col
            span="18"
            offset="1"
          >
            <div class="warning-content">
              {{$t("EnterLoanAmount.dialogDesc1")}}
              <b>5,000{{$store.state.currency}}.</b> {{$t("EnterLoanAmount.dialogDesc2")}}
              <b>100,000{{$store.state.currency}}!</b>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="button-group">
        <van-row>
          <van-col span="11">
            <van-button
              size="small"
              class="bottom-btn dialog-btn plain"
              @click="applyForLoan"
            >{{$t("EnterLoanAmount.dialogApp")}}</van-button>
          </van-col>
          <van-col
            span="11"
            offset="2"
          >
            <van-button
              size="small"
              class="bottom-btn dialog-btn"
              @click="$router.push({name: 'EnterLoanInfo'})"
            >{{$t("EnterLoanAmount.dialogComplete")}}</van-button>
          </van-col>
        </van-row>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EnterLoanAmount",
  data() {
    return {
      dialog: false,
      form: {
        loanAmount: ""
      }
    };
  },
  computed: {
    ...mapState(["completeLoanProfile"])
  },
  methods: {
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
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
      this.form.loanAmount = val;
    },
    activateDialog() {
      this.dialog = true;
      event.preventDefault();
    },
    handleApply() {
      if (this.completeLoanProfile) {
        this.applyForLoan();
      } else {
        this.activateDialog();
      }
    },
    applyForLoan() {
      // update Loan Amount
      this.$store.commit("UpdateForm", {
        loanAmount: parseInt(this.form.loanAmount.replace(/,/g, ""))
      });
      this.$api.applyLoan(this.$store.state.form.loanAmount).then(res => {
        if (res.data.code === 200 && res.data.data === true) {
          // let successMsg = "Application Sent Successfully";
          // this.$notify({
          //   message: successMsg,
          //   duration: 50000,
          //   background: "#04A777"
          // });
          // Move the notification handle to Loan Overview Page
          this.$router.push({ name: "Loan", query: { justSubmitted: "true" } });
        }
      });

      // this.$router.push({ name: "Loan" });
    }
  }
};
</script>

<style lang="scss" scoped>
.enter-loan-amount {
  background-color: #e9ebed;
  color: #363f47;
  height: 100vh;
  .banner {
    height: 138px;
    background: url("../../assets/imgs/enter_loan_amount_banner.png") no-repeat;
    background-size: cover;
    text-align: center;
    padding: 26px 0px 45px 0px;
    box-sizing: border-box;
    font-weight: bold;
    line-height: 37px;
    .banner-title {
      font-size: 20px;
    }
    .banner-number {
      font-size: 16px;
    }
  }
  .elForm {
    width: 100%;
    height: 149px;
    .box-card {
      height: 100%;
    }
    .currency {
      position: relative;
      top: 0;
      left: 0;
      font-size: 24px;
    }
  }
  @media screen and (min-height: 460px) {
    .tips {
      color: #68737d;
      font-size: 14px;
      text-align: center;
      position: absolute;
      bottom: 75px;
      padding: 0 16px 0 16px;
    }
    .apply-btn-wrapper {
      position: absolute;
      bottom: 16px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 16px 0 16px;
      .apply-btn {
        height: 40px;
        width: 100%;
        background-color: #ffa702;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  @media screen and (max-height: 460px) {
    .tips {
      color: #68737d;
      font-size: 14px;
      text-align: center;
      padding: 0 16px 0 16px;
      margin-top: 20px;
      display: block !important;
    }
    .apply-btn-wrapper {
      display: block !important;
      width: 100%;
      box-sizing: border-box;
      padding: 0 16px 0 16px;
      .apply-btn {
        height: 40px;
        width: 100%;
        background-color: #ffa702;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }

  .scroll-dialog {
    padding: 20px;
    line-height: 28px;
    .heading {
      text-align: left;
      position: relative;

      > h1 {
        font-size: 24px;
        color: #2f3941;
      }
      > i {
        position: absolute;
        top: -14px;
        right: 2px;
      }
    }

    .warning {
      i {
        color: #fcaa10;
      }
    }
    .button-group {
      margin-top: 40px;
      .dialog-btn {
        width: 100%;
        height: 40px;
      }
      .plain {
        color: #ffa702;
        background-color: #ffffff;
        border: 1px solid #ffa702;
      }
    }
  }
}
</style>

<style lang="scss">
.enter-loan-amount {
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
  .van-button--small {
    font-size: 14px;
  }
}
</style>
