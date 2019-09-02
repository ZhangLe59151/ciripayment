<template>
  <div class="login-page">
    <div class="landingPageContent">
      <div class="slogan-title">{{ $t('Login.verifyPhone')}}</div>
      <div class="slogan-sub">{{ $t('Login.yourPhone')}}</div>
      <div class="input-block">
        <div
          class="nationalCode"
          @click="show = true"
        >
          {{form.nationalCode}}
          <van-icon
            class="dropdownIcon"
            name="arrow-down"
          />
        </div>
        <van-field
          class="phoneNumber"
          v-model="form.phone"
          @focus="showNumber=true"
          maxlength="13"
          readonly
        />
        <van-button
          class="goBtn"
          @click="handleStart"
        >
          <img
            class="icon"
            :src="pathIcon"
          /></van-button>
        <van-button class="goBtn" @click="handleStart">
          <span class="icon iconfont iconPath"></span>
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
        @cancel="show = false;"
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

export default {
  name: "login-page",
  data() {
    return {
      showNumber: false,
      show: false,
      form: {
        phone: "",
        nationalCode: ""
      },
      value1: 0,
      phoneValidationPattern: ""
    };
  },
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode",
      reg: "reg"
    })
  },
  created() {
    this.phoneValidationPattern = this.reg.regEx.phone.thaiExp;
    this.form.nationalCode = this.columns[0];
  },
  methods: {
    setPattern(nationalCode) {
      const item = this.nationCode.find(test => test.code === nationalCode);
      const expName = item ? item.nation + "Exp" : "sgExp";
      this.phoneValidationPattern =
        this.reg.phone[expName] !== undefined
          ? this.reg.phone[expName]
          : this.reg.phone.sgExp;
    },
    onConfirm(value, index) {
      this.form.nationalCode = value;
      this.setPattern(value);
      this.show = false;
    },
    onInput(value) {
      this.form.phone += value;
    },
    onDelete() {
      let kbt = this.form.phone.toString();
      this.form.phone = kbt.length ? kbt.substring(0, kbt.length - 1) : kbt;
    },
    handleStart() {
      if (this.phoneValidationPattern.test(this.form.phone)) {
        this.$store.commit("UpdateUserInfo", {
          applicantPhoneNumber: this.form.nationalCode + this.form.phone,
          nationalCode: this.form.nationalCode,
          phone: this.form.phone
        });
        this.sendOtp();
      } else {
        this.$notify({
          message: "Please input the validate mobile number",
          background: "#b41800"
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/bottom-btn";
.login-page {
  position: fixed;
  background: url("../../assets/imgs/authentication/otpBak.png") no-repeat;
  background-size: contain;
  height: 100vh;

  .landingPageContent {
    position: relative;
    margin: 100px 16px 0 16px;
    background-color: white;
    height: 194px;
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
      bottom: 72px;
      left: 16px;
      height: 20px;
    }

    .nationalCode {
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
      font-size: 16px;
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
      background-color: #ffa702;
      width: 50px;
      .iconPath {
        color: white;
        height: 20px;
        width: 40px;
      }
    }

    

  }

  .bottom-btn {
    background-color: #ffa702;
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
