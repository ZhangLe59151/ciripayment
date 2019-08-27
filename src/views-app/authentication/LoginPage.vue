<template>
  <div class="login-page">
    <!-- <WapHeader
      :center="true"
      style="top: 34px"
    /> -->
    <div class="landingPageContent">
      <div class="slogan-title">Verify your mobile number to continue</div> 
      <div class="slogan-sub">Your Mobile Number</div>
      <div class="input-block">
        <div class="nationalCode" @click="show = true">
          {{form.nationalCode}} <van-icon class="dropdownIcon" name="arrow-down" />
        </div>
        <van-field
          class="phoneNumber"
          v-model="form.phone"
          @focus="showNumber=true"
          maxlength="13"
          readonly
          />
        <van-button class="goBtn" @click="handleStart">
          <img :src="pathIcon" />
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
import { mapState } from "vuex";
import { regEx } from "@/assets/reg/regEx.js";
// import WapHeader from "@/components/WapHeader";
export default {
  name: "login-page",
  components: {
    // WapHeader
  },
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode",
      reg: "reg"
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
      showNumber: false,
      pathIcon: require("@/assets/imgs/Path.svg"),
      show: false,
      form: {
        phone: "",
        nationalCode: ""
      },
      value1: 0,
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
    onInput(value) {
      this.form.phone += value;
    },
    onDelete() {
      let kbt = this.form.phone.toString();
      this.form.phone = kbt.length
        ? kbt.substring(0, kbt.length - 1)
        : kbt;
    },
    handleStart() {
      if (this.phoneValidationPattern.test(this.form.phone)) {
        this.$store.commit("UpdateUserInfo", {
        applicantPhoneNumber: this.form.nationalCode + this.form.phone,
        nationalCode: this.form.nationalCode,
        phone: this.form.phone
        });
        this.sendOtp();
      }else {
        this.$notify({
            message: "Please input the validate mobile number",
            background: "#04A777"
          });
        return false;
      }
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
.login-page {
  position: fixed;
  background: url("../../assets/imgs/landing_bg.png") no-repeat;
  background-size: cover;
  height: 100vh;

  .landingPageContent {
    position: relative;
    margin: 100px 16px 0 16px;
    background-color: white;
    height: 194px;
    width: 328px;
    border-radius: 16px;

    .slogan-title {
      position: absolute;
      margin: 24px 16px 0 16px;
      font-size: 20px;
      font-weight: bolder;
      color: #2F3941;
      text-align: left;
    }

    .slogan-sub {
      position: absolute;
      text-align: left;
      color: #2F3941;
      font-size: 14px;
      bottom: 72px;
      left: 16px;
    }

    .nationalCode{
      position: absolute;
      left: 16px;
      bottom: 24px;
      font-size: 14px;
      display: flex;
      line-height: 40px;
      width: 60px;
      justify-content: space-between;
      border-bottom: 1px solid #878787;

      .dropdownIcon {
        position: absolute;
        left: 40px;
        bottom: 14px;
      }
    }

    .phoneNumber {
      position: absolute;
      left: 95px;
      right: 80px;
      bottom: 24px;
      width: 150px;
      border-bottom: 1px solid #878787;
    }

    .goBtn {
      position: absolute;
      right: 16px;
      bottom: 24px;
      background-color: #ff8600;
      width: 50px;
    }

      
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
