<template>
  <div class="merchant-login">
    <div class="login-box">
      <div class="secured">
        <img src="../assets/imgs/security.png">
        <span>Secure Site</span>
      </div>

      <div class="logo">
        <img src="../assets/imgs/bank.png">
        <span>{{clientInfo.bankName}}</span>
      </div>

      <div class="title">
        Merchant Services
      </div>
      <PhoneForm
          v-if="loginPhase === 0"
          v-on:sendOTP="initVerify()"
      ></PhoneForm>
      <VerifyOTPForm
        v-if="loginPhase === 1"
        v-on:verifyOTP="handleNextVerify()">
      </VerifyOTPForm>
      <PasswordLoginForm
        v-if="loginPhase === 2"
        v-on:verifyPass="handleNext()">
      </PasswordLoginForm>
      <div class="loading"
           v-if="loginPhase === -1"
           v-loading="true"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PhoneForm from "./PhoneForm.vue";
import VerifyOTPForm from "./VerifyOTPForm";
import PasswordLoginForm from "./PasswordLoginForm";

export default {
  name: "MerchantLogin",
  components: {
    PhoneForm,
    VerifyOTPForm,
    PasswordLoginForm
  },
  data() {
    return {
      // loginPhase
      // 0 : Phone number insertion
      // 1 : Login using OTP
      // 2 : Login using Password
      loginPhase: 0,
      form: {}
    }
  },
  computed: {
    ...mapState({
      clientInfo: "clientInfo"
    })
  },
  methods: {
    initVerify() {
      this.updateForm();
      this.$api
        .checkPasswordExistence({ params: {
          phoneNumber: this.form.applicantPhoneNumber }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.loginPhase = 2;
          } else if (res.data.code === 10050) {
            this.loginPhase = 1;
          } else {
            this.$toast(res.data.msg);
            this.loginPhase = 0;
          }
        });
    },
    handleNextVerify() {
      this.$router.push({ name: "CreatePassword" });
    },
    handleNext() {
      this.$router.push({ name: "ServiceOverview" });
    },
    updateForm() {
      this.$store.commit("InitForm");
      const form = Object.assign({}, this.$store.state.form);
      Object.keys(form).map(item => {
        if (!form[`${item}`]) {
          form[`${item}`] = "";
        }
      });
      this.form = Object.assign({}, form);
    }
  },
  created() {
    this.loginPhase = 0;
    // Reset form content to clear previous submitted information
    this.$store.commit("ClearForm");
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";
  .merchant-login {
    background-image: url(../assets/imgs/background-mobile.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    position: relative;
    .van-nav-bar {
      background-color: #f2f2f2;
    }

    .title {
      font-size: 36px;
      font-weight: bold;
    }

    .login-box {
      background-color: #ffffff;
      position: absolute;
      width: 275px;
      min-height: 440px;
      border-radius: 10px;
      top: 50%;
      margin-top: -290px;
      left: 15px;
      padding: 35px 25px;

      .loading {
        min-height: 200px;
      }

      .secured {
        img {
          width: 16px;
          height: 17px;
        }
        span {
          font-size: 14px;
          color: #929292;
          position: relative;
          top: -4px;
          left: 10px;
        }
      }

      .logo {
        margin: 15px 0;
        text-transform: uppercase;
        img {
          width: 25px;
          height: 25px;
        }
        span {
          font-size: 18px;
          color: #000;
          position: relative;
          top: -5px;
          left: 10px;
        }
      }

    }

  }
</style>
