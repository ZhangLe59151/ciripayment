<template>
  <div class="verify-otp">
    <van-nav-bar
      title
      left-text="Back"
      right-text="Cancel"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleCancel"
      :border="false"
    ></van-nav-bar>

    <div
      v-if="!sendOtpError"
      class="tips"
    >A OTP was sent to
    </div>
    <div
      v-else
      class="tips-error"
    >{{otpErrorMsg}}
    </div>
    <div class="phone">{{this.$store.state.form.nationalCode}} {{this.$store.state.form.phone}}</div>
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
    >Resend Code（{{count}}s）
    </div>
    <div
      class="resend"
      v-show="show"
      @click="handleResend"
    >Resend Code
    </div>
    <div class="page">3/3</div>
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

.verify-otp {
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

  .page {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }
}
</style>

<script>
// @ is an alias to /src
import util from "@/util.js";

export default {
  name: "verify-otp",
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
      form: {},
      timerStartTime: null,
      ls: window.localStorage
    };
  },
  computed: {
    serviceType() {
      return this.$store.state.form.serviceType;
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
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    handleResend() {
      this.countTime();
      this.getCode();
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
          phoneNumber:
            this.$store.state.form.nationalCode + this.$store.state.form.phone,
          otpCode: this.value
        })
        .then(res => {
          if (res.data.code === 200) {
            // TODO: add checking of existing application, redirect to check status page
            this.$api.serviceOverview().then(res => {
              if (
                res.data.code === 200 &&
                res.data.data.applicationStatus !== 2
              ) {
                let marketingEnabled = false;
                let paymentEnabled = false;
                if (this.serviceType.includes("0")) {
                  if (res.data.data.paymentChannelOverviewVo !== undefined) {
                    res.data.data.paymentChannelOverviewVo.forEach(function(paymentChannel, index) {
                      console.log(paymentChannel, index);
                      if (paymentChannel.status === 1) {
                        paymentEnabled = true;
                      }
                    });
                  }
                } else {
                  paymentEnabled = true;
                }
                if (this.serviceType.includes("1")) {
                  if (res.data.data.marketingServiceOverviewVo.status === 1) {
                    marketingEnabled = true;
                  }
                } else {
                  marketingEnabled = true;
                }
                let merchantEnabled = paymentEnabled & marketingEnabled;
                if (merchantEnabled) {
                  this.$dialog
                    .alert({
                      message:
                        "It looks like you already have services enabled with us.\n" +
                        "Log in to your Merchant Portal to manage them or apply for more services."
                    })
                    .then(() => {
                      this.$store.state.serviceOverviewVo = res.data.data;
                      this.$api
                        .checkPasswordExistence({ params: {
                          phoneNumber: this.form.applicantPhoneNumber }
                        })
                        .then(res => {
                          if (res.data.code === 10050) {
                            this.$router.push({ name: "CreatePassword" });
                          }
                        });
                      this.$router.push({ name: "MerchantPortal" });
                    });

                  return false;
                }
                // applicationStatus === 2 means rejected applicaiton,so user can re-apply appliation
                this.$dialog
                  .alert({
                    message:
                      "You have applied for the services. Go to your merchant portal to check out the status and enjoy your services now."
                  })
                  .then(() => {
                    this.$store.state.serviceOverviewVo = res.data.data;
                    this.$router.push({ name: "ServiceOverview" });
                  });

                return false;
              }
              // no existing application - go to new application page
              this.$router.push({ name: "DocumentsPrepare" });
            });
          } else {
            this.$notify({
              message: otpCodeErrorMessage,
              duration: 1000
            });
          }
        });
    },
    handleCancel() {
      this.$store.commit("ClearForm");
      util.redirectToHome(this);
    }
  }
};
</script>
