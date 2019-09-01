<template>
  <div class="landing-page">
    <authentication-app-login-header
      :title="$t('Login.loginTitle')"
      :showLeftIcon="false"
    />

    <div class="landingPageContent">
      <div class="titleFont">{{ $t('Login.loginPageTitle') }}</div>
      <van-button
        class="getStartBtn"
        @click="getStart"
        v-analytics="{event: 'Landing_Start'}"
      >{{ $t('Login.getStart') }}</van-button>
      <van-button
        class="SigninBtn"
        @click="signIn"
        v-analytics="{event: 'Landing_Signin'}"
      >{{ $t('Login.signIn') }}</van-button>
      <div class="bottomTitle">{{ $t('Login.announce') }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import WapHeader from "@/components/WapHeader";
export default {
  name: "landing-page",
  components: {
    // WapHeader
  },
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode",
      isFirst: "firstLaunch"
    })
  },
  data() {
    return {
      show: false,
      form: {},
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true
    };
  },
  methods: {
    getStart() {
      if (this.isFirst === "No") {
        this.$router.push({ name: "Home" });
      } else {
        this.$router.push({ name: "PersonalQuestion", params: { id: 0 } });
      }
    },
    signIn() {
      this.$router.push({ name: "LoginPage" });
    },
    setPattern(nationalCode) {
      const item = this.nationCode.find(test => test.code === nationalCode);
      const expName = item ? item.nation + "Exp" : "sgExp";
      if (this.$store.state.phone[expName] !== undefined) {
        this.phoneValidationPattern = this.$store.state.phone[expName];
      } else {
        this.phoneValidationPattern = this.$store.state.phone.sgExp;
      }
      console.log(this.phoneValidationPattern);
    },
    onConfirm(value, index) {
      this.form.nationalCode = value;
      this.setPattern(value);
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    handleStart() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$store.commit("UpdateUserInfo", {
            applicantPhoneNumber: this.form.nationalCode + this.form.phone,
            nationalCode: this.form.nationalCode,
            phone: this.form.phone
          });
          this.sendOtp();
        } else {
          return false;
        }
      });
    },

    sendOtp() {
      this.$api
        .sendOtp({
          phoneNumber: this.form.nationalCode + this.form.phone
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.$notify(
              res.data.code === 10003 ? this.$t("OTPErrorMsg") : res.data.msg
            );
            return;
          }
          this.$store.commit("UpdateUserInfo", {
            accountVerified: res.data.data.merchantExist
          });
          this.$router.push({
            name: "EnterOtp",
            query: this.$route.query
          });
        });
    }
  },
  created() {
    this.form.nationalCode = this.columns[0];
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/bottom-btn";
.landing-page {
  background: url("../../assets/imgs/authentication/landBak.png") no-repeat;
  background-size: contain;
  height: 100vh;

  .landingPageContent {
    position: fixed;
    bottom: 20px;
    width: 100%;
    height: 207px;
    background-color: white;

    .titleFont {
      position: absolute;
      top: 10px;
      font-weight: bolder;
      font-size: 24px;
      margin: 0 16px 0 16px;
      text-align: center;
      width: calc(100% - 32px);
    }

    .getStartBtn {
      position: absolute;
      font-size: 16px;
      margin: 0 16px 0 16px;
      bottom: 88px;
      height: 40px;
      width: calc(100% - 32px);
      color: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      background-color: #ffa702;
    }

    .SigninBtn {
      position: absolute;
      font-size: 16px;
      margin: 0 16px 0 16px;
      bottom: 38px;
      height: 40px;
      width: calc(100% - 32px);
      color: #ffa702;
      background-color: white;
      border: 1px solid #ffa702;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .bottomTitle {
      position: absolute;
      font-size: 12px;
      color: #68737d;
      left: 27px;
      bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.loginWrapper {
  .el-form-item__error {
    position: relative;
    left: 15px;
  }
}
</style>
