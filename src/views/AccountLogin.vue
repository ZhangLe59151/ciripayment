<template>
  <div class="account-login">
    <div class="login-box">
      <div class="security-lock">
        <img :src="security">
        <div>Secured Site</div>
      </div>
      <div class="tips">
        Online Business
        <br>Banking
      </div>

      <div class="otp">
        <div>Mobile Number</div>
        <el-form
          label-position="left"
          label-width="80px"
          :model="form"
          ref="elForm"
          size="small"
          style="margin-top: 20px;"
        >
          <el-form-item
            prop="phone"
            style="width:100%;"
          >
            <span
              slot="label"
              @click="show = true"
            >
              <van-icon name="phone" />
              <span class="nationalCode">{{form.nationalCode}}</span>
              <van-icon name="arrow-down" />
            </span>

            <el-input
              v-model="form.phone"
              :maxlength="this.$store.state.phone.maxLen"
              :minength="this.$store.state.phone.minLen"
              placeholder="Mobile Number"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="80px"
            style="width:100%;"
          >
            <el-input
              v-model="form.otpCode"
              placeholder="OTP Code"
              minlength="6"
              maxlength="6"
            >
              <van-button
                v-show="showBtn"
                slot="suffix"
                @click="getCode($event)"
                type="default"
                size="small"
                text="Send OTP"
              ></van-button>
              <van-button
                disabled
                v-show="!showBtn"
                slot="suffix"
                type="default"
                size="small"
              >{{count}}s</van-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <van-button
        size="large"
        class="bottom-btn"
        @click="handleNext"
      >Login</van-button>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-picker
        show-toolbar
        title="National code"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import security from "@/assets/imgs/security.png";
import { mapState } from "vuex";
export default {
  name: "login-otp",
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationalCode: "nationalCode"
    })
  },
  data() {
    return {
      security: security,
      showBtn: true,
      show: false,
      count: "",
      form: {},
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      timer: null,
      timerStartTime: null,
      accountErrorMessage:
        "Sign In failed. Please check your account information."
    };
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    setPattern(nationalCode) {
      const item = this.nationCode.find(test => test.code === nationalCode);
      const expName = item ? item.nation + "Exp" : "sgExp";
      if (this.$store.state.phone[expName] !== undefined) {
        this.phoneValidationPattern = this.$store.state.phone[expName];
      } else {
        this.phoneValidationPattern = this.$store.state.phone.sgExp;
      }
    },
    onConfirm(value, index) {
      this.form.nationalCode = value;
      this.setPattern(value);
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    getCode(event) {
      event.preventDefault();
      var phoneNumberEmpty = "Please enter a valid phone number";
      var phoneNumberInvalid = "Please enter a valid phone number";
      var phonePattern = this.phoneValidationPattern;

      if (this.form.phone === "" || typeof this.form.phone === "undefined") {
        this.$notify({
          message: phoneNumberEmpty,
          duration: 3000
        });
        return false;
      } else if (!phonePattern.test(this.form.phone)) {
        this.$notify({
          message: phoneNumberInvalid,
          duration: 3000
        });
        return false;
      }

      this.value = "";
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.timerStartTime = new Date();
        this.count = TIME_COUNT;
        this.showBtn = false;
        this.timer = setInterval(() => {
          var remaining = Math.round(
            (this.timerStartTime.getTime() - new Date().getTime()) / 1000 + 60
          );

          if (remaining > 0 && remaining <= TIME_COUNT) {
            this.count = remaining;
          } else {
            this.showBtn = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      this.$api
        .sendOtp({
          phoneNumber: this.form.nationalCode + this.form.phone
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.showErrorMessage(res.data.msg);
          }
        });
    },

    showErrorMessage(message, long) {
      this.$notify({
        message: message,
        duration: long ? 5000 : 3000
      });
    },

    handleNext() {
      var otpCodeErrorMessage =
        "Incorrect OTP. Please double check and try again.";

      if (
        this.form.otpCode === "" ||
        typeof this.form.otpCode === "undefined" ||
        this.form.otpCode.length !== 6
      ) {
        this.showErrorMessage(otpCodeErrorMessage);
        return false;
      }
      this.$api
        .verifyOtp({
          phoneNumber: this.form.nationalCode + this.form.phone,
          otpCode: this.form.otpCode
        })
        .then(res => {
          if (res.data.code === 200) {
            this.checkDuplicate();
          } else {
            this.showErrorMessage(this.accountErrorMessage);
          }
        });
    },

    checkDuplicate() {
      this.$api.getApplictionStatus().then(res => {
        if (res.data.code === 200) {
          var appStatus = res.data.data.applicationStatus + "";
          if (appStatus === this.$store.state.applicationStatus.approved) {
            this.$router.push({
              name: "AccountInfo",
              query: {
                phone: this.form.phone,
                nationalCode: this.form.nationalCode
              }
            });
          } else {
            this.showErrorMessage(this.accountErrorMessage);
          }
        } else {
          this.showErrorMessage(this.accountErrorMessage);
        }
      });
    }
  },
  created() {
    this.form.nationalCode = this.columns[0];
  }
};
</script>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";
  .account-login {
  text-align: center;
  height: 100vh;
  background: gray;
  padding-top: 140px;

  .login-box {
    width: 90%;
    margin-left: 5%;
    border: 1px solid #d7d7d7;
    background: #fff;
    border-radius: 8px;
    padding: 24px 0;

    position: relative;
    text-align: left;
    .security-lock {
      width: 80%;
      height: 16px;
      padding-left: 20px;
      div {
        display: block;
        float: left;
        margin-left: 10px;
        height: 16px;
        color: #929292;
        font-size: 11px;
        line-height: 16px;
      }
      img {
        width: 13px;
        display: block;
        float: left;
      }
    }
  }
  .steps {
    text-align: left;
    width: 80%;
    margin-left: 10%;
  }
  .title {
    font-size: 20px;
    padding: 20px;
  }
  .tips {
    font-size: 27px;
    padding: 20px;
    text-align: left;
  }

  .otp {
    text-align: left;
    padding: 0 20px;
    font-size: 15px;
    color: #053c5e;
    .nationalCode {
      color: #053c5e;
    }
    .van-icon-phone {
      color: #053c5e;
    }
    .van-icon-arrow-down {
      color: #053c5e;
    }
  }
}
</style>
