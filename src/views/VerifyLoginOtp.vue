<template>
  <div class="verify-login-otp">
    <van-nav-bar
      title
      left-text="Back"
      left-arrow
      @click-left="handleBack"
      right-text="Cancel"
      @click-right="$router.push({name: 'Welcome'})"
      :border="false"
    />

    <div
      v-if="!sendOtpError"
      class="tips"
    >An OTP was sent to</div>
    <div
      v-else
      class="tips-error"
    >{{otpErrorMsg}}</div>
    <div class="phone">{{$route.query.nationalCode}} {{$route.query.phone}}</div>
    <div class="sub-tips">Enter the 6-digit password below.</div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info
      @focus="showKeyboard = true"
    />

    <van-button
      size="large"
      class="bottom-btn"
      @click="handleVerify"
    >
      Verify
    </van-button>

    <div
      v-show="!show"
      class="resend"
    >Resend Code（{{count}}s）</div>
    <div
      class="resend"
      v-show="show"
      @click="handleResend"
    >Resend Code</div>

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.verify-login-otp {
  text-align: center;

  .title {
    font-size: 20px;
    padding: 20px;
  }
  .tips {
    font-size: 27px;
    padding: 20px;
  }
  .tips-error {
    font-size: 20px;
    padding: 20px;
    color: #dd1111;
  }
  .sub-tips {
    font-size: 15px;
    margin: 10px 0;
  }
  .phone {
    font-size: 27px;
    text-decoration: underline;
  }
  .otp {
    text-align: left;
    padding: 0 10%;
  }
  .resend {
    margin: 20px 0;
    text-decoration: underline;
  }
}
</style>

<script>
// @ is an alias to /src
export default {
  name: "verify-login-otp",
  components: {},
  data() {
    return {
      active: 2,
      phone: "",
      value: "",
      showKeyboard: true,
      show: true,
      count: "",
      timer: null,
      sendOtpError: false,
      otpErrorMsg: "",
      timerStartTime: null
    };
  },
  mounted() {
    this.getCode();
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    handleResend() {
      this.getCode();
      this.sendOtp();
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    handleVerify() {
      var otpCodeErrorMessage =
        "Incorrect OTP. Please double check and try again.";
      if (this.value === "" || this.value.length !== 6) {
        this.$notify({
          message: otpCodeErrorMessage,
          duration: 1000
        });
        return false;
      }
      this.$api
        .verifyOtp({
          phoneNumber: this.$route.query.nationalCode + this.$route.query.phone,
          otpCode: this.value
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$router.push({
              name: "ViewApplication",
              query: {
                phone: this.$route.query.phone,
                nationalCode: this.$route.query.nationalCode
              }
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    getCode() {
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
    sendOtp() {
      this.$api
        .sendOtp({
          phoneNumber: this.$route.query.nationalCode + this.$route.query.phone
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.sendOtpError = true;
            this.otpErrorMsg = res.data.msg;
          }
        });
    },
    handleBack() {
      this.$router.push({
        name: "Login",
        query: {
          phone: this.$route.query.phone,
          nationalCode: this.$route.query.nationalCode
        }
      });
    }
  }
};
</script>
