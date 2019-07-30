<template>
  <div class="reset-password">
    <van-nav-bar
      @click-right="$router.back()"
      :border="false"
    >
      <van-icon name="cross" slot="right" />
    </van-nav-bar>

    <div class="resetPassWrapper">
      <div class="title">
        Reset Password
      </div>
      <div class="description">
        Create a new password and try not to forget it this time.
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
              :type="passwordType"
              :maxlength="25"
            >
              <img v-if="!showingPassword" @click="toggleShowingPassword" slot="suffix" src="../assets/imgs/hide.svg" class="showingPasswordIcon" />
              <img v-else slot="suffix" @click="toggleShowingPassword" src="../assets/imgs/reveal.svg" class="showingPasswordIcon" />
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <div class="password-specification">
            At least:
          </div>
          <div class="password-specification" v-bind:class="{ passed: passwordMinLengthCorrect ,error: !passwordMinLengthCorrect&&showPasswordError}">
            <img
              v-if="passwordMinLengthCorrect"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
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
          <div class="password-specification" v-bind:class="{ passed: containsUppercase, error: !containsUppercase&&showPasswordError}">
            <img
              v-if="containsUppercase"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
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
          <div class="password-specification" v-bind:class="{ passed: containsLowercase, error: !containsLowercase&&showPasswordError}">
            <img
              v-if="containsLowercase"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
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
          <div class="password-specification" v-bind:class="{ passed:containsNumber, error: !containsNumber&&showPasswordError}">
            <img
              v-if="containsNumber"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
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
          <div class="password-specification" v-bind:class="{ passed: containsSpecialChar, error: !containsSpecialChar&&showPasswordError}">
            <img
              v-if="containsSpecialChar"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
              alt
              slot="icon"
            >
            <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
            >
            1 Special character (!@#$%^&*()-_+=)
          </div>
          <div class="password-specification" v-bind:class="{ passed: noSpace, error: !noSpace&&showPasswordError}">
            <img
              v-if="noSpace"
              :src="checkboxActive"
              alt
              slot="icon"
            >
            <img
              v-else-if ="showPasswordError"
              :src="checkboxError"
              alt
              slot="icon"
            >
            <img
              v-else
              :src="checkboxInactive"
              alt
              slot="icon"
            >
            No spacing
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
              :type="passwordType"
              :maxlength="25"
              @focus="activateErrorCheck()"
              @change="checkSamePassword()"
            >
              <img v-if="!showingPassword" @click="toggleShowingPassword" slot="suffix" src="../assets/imgs/hide.svg" class="showingPasswordIcon" />
              <img v-else slot="suffix" @click="toggleShowingPassword" src="../assets/imgs/reveal.svg" class="showingPasswordIcon" />
            </el-input>
            <div
              v-if="showConfirmPassError"
              class="tips-error"
            >
              Passwords do not match.
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <van-button
      size="large"
      v-bind:class="[(passwordAccepted && (password === confirmPass)) ? 'bottom-btn' : 'bottom-btn disabled']"
      @click="handleNext"
      style="width: 80%"
    >
      Log In
    </van-button>

  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      form: {},
      password: "",
      confirmPass: "",
      showingPassword: false,
      passwordType: "password",
      checkboxActive: require("@/assets/imgs/success.svg"),
      checkboxInactive: require("@/assets/imgs/oval.svg"),
      checkboxError: require("@/assets/imgs/red-oval.svg"),
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
    },
    noSpace() {
      return this.$store.state.password.noSpace.test(this.password);
    },
    passwordAccepted() {
      return this.passwordMinLengthCorrect &&
        this.containsUppercase && this.containsLowercase &&
        this.containsNumber && this.containsSpecialChar;
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
    },
    toggleShowingPassword() {
      if (this.showingPassword) {
        this.passwordType = "password";
      } else {
        this.passwordType = "text";
      }
      this.showingPassword = !this.showingPassword;
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
  .reset-password {
    .bottom-btn{
      background-color: #053C5E;
      border-radius: 4px;
      width: 100%;
      position:fixed;
      bottom: 0;
    }

    .disabled{
      background-color: #DCDCDC;
      color: #929292;
    }

    .resetPassWrapper{
      padding-left: 5%;
      padding-right: 5%;
    }

    .title {
      margin-top: 50px;
      font-size: 24px;
      text-align: left;
      font-weight: bold;
    }

    .description {
      font-size: 16px;
      line-height: 24px;
      color: #2F3941;
      margin-top:25px;
    }

    .password-box {
      .showingPasswordIcon {
        width: auto;
        height: 100% ;
        color:#A0B4C0;
      }
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
      .passed {
        color: #04A777;
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
