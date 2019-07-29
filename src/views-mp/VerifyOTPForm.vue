<template>
  <div class="verifyOTPForm">
    <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        style="margin-top: 20px;"
    >
      <span class="label-title">A One-Time Password (OTP) has been sent to
        <b>
        {{this.$store.state.form.nationalCode}} {{this.$store.state.form.phone}}.
        </b>
      </span>
      <el-form-item
          label="OTP"
          prop="otp"
      >
        <el-input
            v-model="otpCode"
            placeholder="OTP Code"
            type="password"
            :maxlength="6"
        >
          <el-button slot="append">
          <div
              v-show="!show"
              class="resend"
          >Resend OTP（{{count}}s）
          </div>
          <div
              class="resend"
              v-show="show"
              @click="handleResend"
          >Resend OTP
          </div>
          </el-button>
        </el-input>
      </el-form-item>
      <div
          v-if="sendOtpError"
          class="tips-error"
      >{{otpErrorMsg}}
      </div>
    </el-form>
    <van-button
        size="large"
        class="bottom-btn"
        @click="handleNext"
    >
      Log In
    </van-button>
  </div>
</template>

<script>
export default {
  name: "VerifyOTPForm",
  data() {
    return {
      otpCode: "",
      form: {},
      active: 2,
      phone: "",
      value: "",
      show: true,
      count: "",
      timer: null,
      sendOtpError: false,
      otpErrorMsg: "",
      timerStartTime: null,
      ls: window.localStorage
    }
  },
  methods: {
    handleResend() {
      this.countTime();
      this.getCode();
    },
    handleNext() {
      this.otpErrorMsg =
        "Incorrect OTP. Please double check and try again.";
      if (this.otpCode === "" || this.otpCode.length !== 6) {
        this.sendOtpError = true;
        return false;
      }
      this.$api
        .verifyOtp({
          phoneNumber: this.$store.state.form.applicantPhoneNumber,
          otpCode: this.otpCode
        })
        .then(res => {
          if (res.data.code === 200) {
            this.sendOtpError = false;
            this.$emit("verifyOTP", true);
          } else {
            this.sendOtpError = true;
            this.otpErrorMsg =
              "Incorrect OTP. Please double check and try again.";
          }
        });
    },
    countTime() {
      this.value = "";
      this.sendOtpError = false;
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.timerStartTime = new Date();
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          var remaining = Math.round(
            (this.timerStartTime.getTime() - new Date().getTime()) / 1000 + 60
          );

          if (remaining > 0 && remaining <= TIME_COUNT) {
            this.count = remaining;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    getCode() {
      this.$api
        .sendOtp({
          phoneNumber:
            this.$store.state.form.nationalCode + this.$store.state.form.phone
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.sendOtpError = true;
            this.otpErrorMsg = res.data.msg;
          }
        });
    }
  },
  created() {
    this.countTime();
    this.$store.commit("InitForm");
    const form = Object.assign({}, this.$store.state.form);
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.form = Object.assign({}, form);
    this.getCode();
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/css/bottom-btn.scss";

  .verifyOTPForm {
    min-height: 200px;

    .bottom-btn {
      position: absolute;
      bottom: 10px;
      left: 0;
    }

    .label-title {
      font-size: 14px;
      line-height: 24px;
    }

    .resend {
      margin: 0;
      width: 100px;
    }

    .bottom-btn {
      position: absolute;
      bottom: 10px;
      left: 0;
    }
    .tips-error {
      padding: 0 5px;
      font-size: 14px;
      color: #dd1111;
    }
    .tips-error:before {
      content: url(../assets/imgs/error.svg);
      width: 5px;
      height: 5px;
      margin-right: 5px;
    }
  }
</style>
