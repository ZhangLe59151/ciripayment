<template>
  <div class="enter-otp">
    <WapHeader
      :left="true"
      :center="true"
    />

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
            <span slot="label">
              <span style="margin: 0 10px;">{{form.nationalCode}}</span>
              <i
                class="el-icon-caret-bottom"
                style="color: #929292"
              ></i>
            </span>
            <el-input
              v-model="form.phone"
              :maxlength="this.$store.state.phone.maxLen"
              :minlength="this.$store.state.phone.minLen"
              disabled
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
      <div class="sub-tips">Enter OTP</div>

      <van-password-input
        v-if="form.accountVerified"
        :value="value"
        info
        @focus="showKeyboard = true"
        :mask="false"
        :length="6"
        style="margin-left: -15px ; color : #929292;"
      />
      <van-password-input
        v-else
        :value="value"
        info
        @focus="showKeyboard = true"
        :mask="false"
        :length="6"
        style="margin-left: -15px ; color : #929292;"
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
        v-if="!form.accountVerified"
        size="large"
        class="bottom-btn"
        @click="handleVerifyOtpUnverifiedAccount"
      >
        Continue
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
@import "../../assets/css/bottom-btn";

.enter-otp {
  background: url("../../assets/imgs/landing_bg.png");
  min-height: 100vh;
  .login-title {
    font-size: 24px;
    color: #ffffff;
    font-weight: bold;
    margin-top: 3.25rem;
  }

  .enterOtpWrapper {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    height: 72vh;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 20px 20px 0;
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
    color: #87929d;
  }
  .resend-active {
    margin: 20px 0;
    text-decoration: none;
    font-size: 14px;
    color: #037aff;
  }

  .page {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }
  .bottom-btn {
    background-color: #ff8600;
    border-radius: 4px;
    margin: 0;
    width: calc(100% - 40px);
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
}
</style>

<script>
// @ is an alias to /src
import util from "@/util";
import WapHeader from "@/components/WapHeader";
export default {
  name: "enter-otp",
  components: {
    WapHeader
  },
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
      return this.$store.state.userInfo.serviceType;
    }
  },
  watch: {
    value: function(val) {
      // watch input if verified account
      if (this.form.accountVerified) {
        this.handleVerifyOtpVerifiedAccount();
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
            // TODO get Home information
            const to = this.$route.query.to;
            this.$api.getHomePageInfo().then(res => {
              if (res.data.code === 200) {
                const hasLoan = res.data.data.hasLoan;
                // if already got loan, move to Loan result page instead of Loan Form
                if (hasLoan && to === "EnterLoanInfo") {
                  this.$router.push({ name: "Loan" });
                  return false;
                }
              }
            });
            this.$router.push(to ? { name: to } : { name: "Home" });
            // this.$router.push({ name: "Home" });
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
