<template>
  <div class="create-password">
    <van-nav-bar
        title
        :border="false"
        style="background-color: #ffffff">
    </van-nav-bar>
    <div class="title">
      Create Password
    </div>
    <div class="description">
      Set a password to secure your Merchant Portal account and access all features.
    </div>
    <div class="password-box">
      <el-form
          label-width="0px"
          status-icon
          :model="form"
          ref="elFormPass"
          size="small"
          label-position="top"
      >
        <el-form-item
            label="Password"
            prop="password"
            :rules="[
      ]"
        >
          <el-input
              v-model="password"
              placeholder="Password"
              type="password"
              :maxlength="25"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <div class="password-specification">
      Password should contain at least:
        </div>
        <div class="password-specification" v-bind:class="{ error: !passwordMinLengthCorrect&&showPasswordError}">
          <img
              v-if="passwordMinLengthCorrect"
              :src="checkboxActive"
              alt
              slot="icon"
          >
          <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
          >
            8 Characters
        </div>
        <div class="password-specification" v-bind:class="{ error: !containsUppercase&&showPasswordError}">
          <img
              v-if="containsUppercase"
              :src="checkboxActive"
              alt
              slot="icon"
          >
          <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
          >
          1 Uppercase character
        </div>
        <div class="password-specification" v-bind:class="{ error: !containsLowercase&&showPasswordError}">
          <img
              v-if="containsLowercase"
              :src="checkboxActive"
              alt
              slot="icon"
          >
          <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
          >
          1 Lowercase character
        </div>
        <div class="password-specification" v-bind:class="{ error: !containsNumber&&showPasswordError}">
          <img
              v-if="containsNumber"
              :src="checkboxActive"
              alt
              slot="icon"
          >
          <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
          >
          1 Number
        </div>
        <div class="password-specification" v-bind:class="{ error: !containsSpecialChar&&showPasswordError}">
          <img
              v-if="containsSpecialChar"
              :src="checkboxActive"
              alt
              slot="icon"
          >
          <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
          >
          1 Special character
        </div>
      </div>
    </div>

    <div class="password-box">
      <el-form
          label-width="0px"
          status-icon
          :model="form"
          ref="elFormPassConfirm"
          size="small"
          label-position="top"
      >
        <el-form-item
            label="Confirm Password"
            prop="confirmPass"
        >
          <el-input
              v-model="confirmPass"
              placeholder="Confirm Password"
              type="password"
              :maxlength="25"
              @focus="activateErrorCheck()"
              @change="checkSamePassword()"
          ></el-input>
          <div
              v-if="showConfirmPassError"
              class="tips-error"
          >
            Passwords do not match.
          </div>
        </el-form-item>
      </el-form>
    </div>
    <van-button
        size="large"
        class="bottom-btn-boxed"
        @click="handleNext"
        style="margin-bottom:100px; width: 100px"
    >
      Continue
    </van-button>
  </div>
</template>

<script>
export default {
  name: "CreatePassword",
  data() {
    return {
      form: {},
      password: "",
      confirmPass: "",
      checkboxActive: require("@/assets/imgs/success.svg"),
      checkboxInactive: require("@/assets/imgs/oval.svg"),
      showPasswordError: false,
      showConfirmPassError: false
    }
  },
  computed: {
    passwordMinLengthCorrect() {
      return this.password.length >= this.$store.state.password.minLen;
    },
    containsUppercase() {
      return this.$store.state.password.uppercase.test(this.password);
    },
    containsLowercase() {
      return this.$store.state.password.lowercase.test(this.password);
    },
    containsNumber() {
      return this.$store.state.password.number.test(this.password);
    },
    containsSpecialChar() {
      return this.$store.state.password.specialChar.test(this.password);
    }
  },
  methods: {
    stopDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    checkSamePassword() {
      if (this.confirmPass === "" || this.password !== this.confirmPass) {
        this.showConfirmPassError = true;
        return false;
      }
      this.showConfirmPassError = false;
      return true;
    },
    activateErrorCheck() {
      this.showPasswordError = true;
    },
    handleNext() {
      if (this.password === "" || !this.$store.state.password.regExp.test(this.password)) {
        this.showPasswordError = true;
        return false;
      }
      if (!this.checkSamePassword()) {
        return false;
      }
      this.$api
        .merchantCreateNewPassword({
          phoneNumber: this.$store.state.form.applicantPhoneNumber,
          password: this.password
        })
        .then(res => {
          if (res.data.code === 200) {
            // this.$store.commit("ClearForm"); // Remove unused data
            this.$router.push({ name: "WelcomeGuide" });
          } else {
            this.$toast(res.data.msg);
            return false;
          }
        });
    }
  },
  created() {
    // Reset form content to clear previous submitted information
    this.$store.commit("InitForm");
    const form = Object.assign({}, this.$store.state.form);
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.form = Object.assign({}, form);
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";
  .create-password {
    text-align: center;

    .van-nav-bar {
      background-color: #f2f2f2;
    }

    .title {
      font-size: 24px;
      margin: 20px 10% 10px;
      text-align: center;
      font-weight: bold;
    }

    .description {
      font-size: 16px;
      line-height: 24px;
    }

    .password-box {
      background-color: #F5F7FA;
      text-align: left;
      margin: 15px 0;
      padding: 10px 35px 10px;
      .password-specification {
        font-size: 12px;
        line-height: 17px;
        color: #929292;
        margin: 5px 0;
        img {
          width: 12px;
          height: 12px;
        }
      }
      .error {
        color: #BD0000;
      }
      .tips-error {
        font-size: 14px;
        color: #dd1111;
      }
      .tips-error:before {
        content: url(../assets/imgs/error.svg)
      }
    }
  }
</style>
