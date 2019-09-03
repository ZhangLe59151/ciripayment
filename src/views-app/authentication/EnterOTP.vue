<template>
  <div class="enterOtpPage">

    <authentication-app-login-header
      :title="$t('Login.loginTitle')"
      :showLeftIcon="true"
    />
    <div
      class="landingPageContent"
      id="otp-content"
    >
      <div class="slogan-title">{{$t('Login.enterOTP')}} {{ phone }} </div>
      <div class="slogan-sub">{{$t('Login.enterOTPtitle')}}</div>
      <van-password-input
        class="inputCode"
        :value="value"
        info
        @focus="showNumber = true"
        :mask="false"
        :length="6"
        gutter=8
      />

      <div
        v-show="!show"
        class="resend"
      >{{$t('Login.resendOTP')}}（{{count}}s）</div>

      <div
        class="resend-active"
        v-show="show"
        @click="handleResend"
      >{{$t('Login.resendOTP')}}
      </div>

    </div>

    <van-number-keyboard
      :show="showNumber"
      close-button-text="Done"
      @blur="showNumber = false"
      @input="onInput"
      @delete="onDelete"
    />

  </div>
</template>

<script>
import util from "@/util";
import { mapState } from "vuex";
export default {
  name: "enter-otp",

  data() {
    return {
      active: 2,
      phone:
        this.$store.state.userInfo.nationalCode +
        " " +
        this.$store.state.userInfo.phone,
      value: "",
      showNumber: true,
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
    ...mapState({
      isFirst: "firstLaunch",
      deviceType: "deviceType"
    })
  },
  watch: {
    /* value: function(val) {
      // watch input if verified account

      if (this.form.accountVerified) {
        this.handleVerifyOtpVerifiedAccount();
      }
    } */
    showNumber(newv, oldv) {
      if (newv) {
        if (window.innerHeight < 560) {
          document.getElementById("otp-content").style.marginTop = 0;
        }
        if (window.innerHeight < 500) {
          document.getElementById("otp-content").style.marginTop = "-100px";
        }
      } else {
        document.getElementById("otp-content").style.marginTop = "100px";
      }
    }
  },
  created() {
    this.countTime();
    this.$store.commit("InitUserInfo");
    const form = Object.assign({}, this.$store.state.userInfo);
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
            this.$store.state.userInfo.nationalCode +
            this.$store.state.userInfo.phone
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
      if (this.value.length === 6) {
        this.handleVerifyOtpUnverifiedAccount();
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },

    // this is for VERIFIED account
    handleVerifyOtpVerifiedAccount() {
      console.log("on input");
      var otpCodeErrorMessage =
        "Incorrect OTP. Please double check and try again.";
      if (this.value.length === 6) {
        console.log("begin verify");
        this.$api
          .verifyOtp({
            phoneNumber:
              this.$store.state.userInfo.nationalCode +
              this.$store.state.userInfo.phone,
            otpCode: this.value
          })
          .then(res => {
            if (res.data.code === 200) {
              // Verified OTP
              this.$store.commit("OTPVerified");
              /*
              // check password
              this.$api
                .checkPasswordExistence({
                  params: {
                    phoneNumber: this.form.applicantPhoneNumber
                  }
                })
                .then(res => {
                  this.$router.push({
                    name:
                      res.data.code === 10050
                        ? "Home"
                        : "Home"
                  });
                });
                */
              // TODO get Home information
              const to = this.$route.query.to;
              this.$api.getHomePageInfo().then(res => {
                if (res.data.code === 200) {
                  // check credit
                  let creditLimit = res.data.data.creditLimit;
                  this.$store.commit("InitCredit", creditLimit);
                  const hasLoan = res.data.data.hasLoan;
                  // if already got loan, move to Loan result page instead of Loan Form
                  if (hasLoan && to === "EnterLoanInfo") {
                    this.$router.push({ name: "Loan" });
                    return false;
                  }
                }
              });
              this.$router.push(to ? { name: to } : { name: "Home" });
            } else {
              this.$notify({
                message: otpCodeErrorMessage,
                duration: 1000
              });
            }
          });
      }
    },

    // this is for UN-VERIFIED account
    handleVerifyOtpUnverifiedAccount() {
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
            this.$store.state.userInfo.nationalCode +
            this.$store.state.userInfo.phone,
          otpCode: this.value
        })
        .then(res => {
          if (res.data.code === 200) {
            // Verify OTP success
            this.$store.commit("OTPVerified");
            this.$analytics.setUserId(res.data.data.uid);
            // TODO get Home information
            let to = this.$route.query.to;
            // If first time, then go to personal question
            if (this.isFirst === "Yes" && this.deviceType === "APP") {
              this.$router.push({
                name: "PersonalQuestion",
                params: { id: 0 },
                query: { to: to }
              });
              return false;
            }
            // If user come from Loan page
            if (to === "EnterLoanInfo") {
              this.$api.getHomePageInfo().then(res => {
                if (res.data.code === 200) {
                  // check if user already has loan
                  const hasLoan = res.data.data.hasLoan;
                  // if already got loan, move to Loan result page instead of Loan Form
                  if (hasLoan && ["EnterLoanInfo"].includes(to)) {
                    this.$router.push({ name: "Loan" });
                    return false;
                  }
                  // else- check credit limit to see if he can apply loan
                  this.$api.verifyLoanApplyAble().then(res => {
                    if (res.data.code === 200) {
                      res.data.data.verifyResult
                        ? this.$router.push({ name: "EnterLoanInfo" })
                        : this.$router.push({
                            name: "LoanAmountExceedLimitError"
                          });
                    } else {
                      this.$notify(res.data.msg);
                    }
                  });
                }
              });
              return false;
            }
            // otherwise : go to Homepage or anywhere they want to
            this.$router.push(to ? { name: to } : { name: "Home" });
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

<style lang="scss" scoped>
.enterOtpPage {
  position: fixed;
  background: url("../../assets/imgs/authentication/otpBak.png") no-repeat;
  background-size: contain;
  height: 100vh;

  .landingPageContent {
    position: relative;
    margin: 100px 16px 0 16px;
    background-color: white;
    height: 258px;
    width: calc(100vw - 32px);
    border-radius: 16px;
    box-shadow: 0 2px 4px 2px #a9a9a9;

    .slogan-title {
      position: absolute;
      margin: 24px 16px 0 16px;
      font-size: 20px;
      font-weight: bolder;
      color: #2f3941;
      text-align: left;
    }

    .slogan-sub {
      position: absolute;
      text-align: left;
      color: #2f3941;
      font-size: 14px;
      top: 120px;
      left: 16px;
    }

    .inputCode {
      position: absolute;
      top: 145px;
      height: 50px;
    }

    .van-hairline {
      border: 1px solid #2f3941;
      border-radius: 4px;
      margin: 0 2px 0 2px;
    }

    .resend {
      position: absolute;
      left: 16px;
      bottom: 24px;
      font-size: 14px;
      color: #87929d;
    }

    .resend-active {
      position: absolute;
      left: 16px;
      bottom: 24px;
      text-decoration: none;
      font-size: 14px;
      color: #037aff;
    }
  }
}
</style>
