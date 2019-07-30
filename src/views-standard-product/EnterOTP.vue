<template>
  <div class="enter-otp">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      :border="false"
    >
      <div slot="title" class="Silot center"><img src="../assets/imgs/Silot-logo.svg"></div>
    </van-nav-bar>

    <div class="login-title center">
      Log In
    </div>

    <div class="enterOtpWrapper">
      <div class="sub-tips">
        Your mobile number
      </div>

      <div class="otp">
        <el-form
          label-width="0px"
          :model="form"
          ref="elForm"
          size="small"
          style="margin-top: 15px;"
        >
          <el-form-item
            label-width="80px"
            class="enterotp"
            prop="phone"
          >
          <span
            slot="label"
          >
              <span
                style="margin: 0 10px;"
              >+66</span>
            <i class="el-icon-caret-bottom" style="color: #053C5E"></i>
          </span>
            <el-input
              v-model="form.phone"
              placeholder="08 1234 1234"
              :maxlength="this.$store.state.phone.maxLen"
              :minlength="this.$store.state.phone.minLen"
              disabled
              style="margin-left:15px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div
        v-if="!sendOtpError"
        class="tips"
      >A One-Time-Passcode (OTP) has been sent to the mobile number above.
      </div>
      <div
        v-else
        class="tips-error"
      >{{otpErrorMsg}}
      </div>
      <div class="phone">{{this.$store.state.form.nationalCode}} {{this.$store.state.form.phone}}</div>
      <div class="sub-tips">Enter OTP</div>

      <van-password-input
        :value="value"
        info
        @focus="showKeyboard = true"
        :mask="false"
        :length="6"
        :gutter="15"
        style="margin-left: -15px"
      />

      <div
        v-show="!show"
        class="resend"
      >Resend OTP（{{count}}s）
      </div>
      <div
        class="resend-active"
        v-show="show"
        @click="handleResend"
      >Resend OTP
      </div>

      <van-button
        size="large"
        class="bottom-btn"
        @click=""
      >
        Create Account
      </van-button>
    </div>

<!--    <div class="page">3/3</div>-->
<!--    &lt;!&ndash; 数字键盘 &ndash;&gt;-->
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

  .enter-otp {
    background: url("../assets/imgs/MP-background.png");
    min-height: 100vh;
    .van-nav-bar {
      background-color: transparent;
      .Silot {
        padding-top: 10px;
      }
    }

    .login-title {
      font-size: 24px;
      color: white;
      font-weight: bold;
      margin-top: 3.25rem;
    }

    .enterOtpWrapper{
      background-color:white;
      position: fixed;
      bottom: 0;
      height: 70%;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding-left: 5%;
      padding-right: 5%;
      padding-top:20px;
    }

    .tips {
      font-size: 16px;
      margin-top: 2.25rem;
      margin-bottom: 2.25rem;
    }
    .tips-error {
      font-size: 20px;
      padding: 20px;
      color: #dd1111;
    }

    .disabled-field{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
      span {
        color: #c0c4cc;
      }
    }

    .sub-tips {
      font-size: 14px;
      margin: 10px 0;
    }

    .phone {
      font-size: 27px;
      text-decoration: underline;
    }

    .otp {
      text-align: left;
    }

    .resend {
      margin: 20px 0;
      text-decoration: none;
      font-size: 14px;
    }
    .resend-active{
      margin: 20px 0;
      text-decoration: none;
      font-size: 14px;
      color:#037AFF;
    }

    .page {
      position: fixed;
      width: 100%;
      text-align: center;
      bottom: 20px;
    }
    .bottom-btn {
      background-color: #053C5E;
      border-radius: 4px;
      margin: 22vh 0 1.25rem 0;
      width: 100%;
    }
  }
</style>

<script>
// @ is an alias to /src
import util from "@/util.js";

export default {
  name: "enter-otp",
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
