<template>
  <div class="landing-page">
    <!-- <WapHeader
      :center="true"
      style="top: 34px"
    /> -->
    <div class="landingPageContent">

      <transition name="van-slide-up">
        <div v-show="$store.state.deviceType && showComponents">
          <!-- <div class="slogan-title center">
            Grow Your Business with Moon Merchant Portal.
          </div> -->
          <div class="slogan-title center">
            {{sloganTitle}}
          </div>
        </div>
      </transition>

      <div class="loginWrapper">
        <div class="tips">
          Your mobile number
        </div>

        <div class="otp landing">
          <el-form
            label-width="0px"
            :model="form"
            ref="elForm"
            size="small"
            style="margin-top: 15px;"
          >
            <el-form-item
              label-width="80px"
              prop="phone"
              class="itemlanding"
              :rules="[
            {  message: 'Please enter a valid phone number', trigger: 'blur' },
            {pattern: phoneValidationPattern, message: 'Incorrect mobile format. Please try again.', trigger: 'blur'}
          ]"
            >
              <span
                slot="label"
                @click="show = true"
                style="display: flex;justify-content: space-between;"
              >
                <span>{{form.nationalCode}}</span>
                <i
                  class="el-icon-caret-bottom"
                  style="color: #FF8600; height: 14px; width: 14px; position: relative; top: 9px;"
                ></i>
              </span>
              <el-input
                v-model="form.phone"
                placeholder=""
                :maxlength="this.$store.state.phone.maxLen"
                :minlength="this.$store.state.phone.minLen"
                style="margin-left: 15px; width:90% ; color: lightgrey"
                @focus="showComponents = false;"
                @blur="showComponents = true"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <van-button
          size="large"
          class="bottom-btn"
          @click="handleStart"
        >
          Get Started
        </van-button>

      </div>

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
    .loginWrapper {
      padding-top: 30px;
      background-color: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding-left: 5%;
      padding-right: 5%;
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
