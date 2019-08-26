<template>
  <div class="landing-page">
    <van-nav-bar
      :title="$t('Login.loginTitle')"
      />
    <div class="landingPageContent">
      <van-button 
        class="getStartBtn"
        @click="getStart" >Get Started</van-button>
      <van-button 
        class="SigninBtn"
        @click="signIn" >Sign In With Mobile</van-button>
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
      nationCode: "nationalCode"
    }),
    sloganTitle() {
      const ob = {
        EnterLoanInfo: "Sign In Now To Get An Instant Loan! ",
        Credit: "Sign In Now To See Your Credit Limit! ",
        fortuneTelling: "Sign In Now To Get Your Daily Fortune!"
      };

      return ob[this.$route.query.to];
    }
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
  background: url("../../assets/imgs/landing_bg.png") no-repeat;
  background-size: cover;
  height: 100vh;
  
  .landingPageContent {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 147px;
    font-size: 16px;
    background-color: white;

    .getStartBtn {
      position: absolute;
      margin: 0 16px 0 16px;
      height: 60px;
      width: 328px;
      color: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      background-color: #ff8600;
    }

    .SigninBtn {
      position: absolute;
      margin: 0 16px 0 16px;
      bottom: 12px;
      height: 60px;
      width: 328px;
      color: #ff8600;
      background-color: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
  }

  .slogan-title {
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 80%;
    margin-left: 10%;
  }
  .slogan-sub {
    text-align: center;
    color: white;
    font-size: 16px;
    margin-bottom: 20px;
    width: 80%;
    margin-left: 8%;
  }
  .title {
    font-size: 20px;
    padding: 20px;
  }
  .tips {
    font-size: 14px;
  }

  .otp {
    text-align: left;
    font-size: 15px;
  }
  .bottom-btn {
    background-color: #ff8600;
    border-radius: 4px;
    margin: 1.25rem 0;
    width: 100%;
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
