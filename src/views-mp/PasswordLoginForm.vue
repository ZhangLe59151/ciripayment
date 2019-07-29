<template>
  <div class="verifyOTPForm">
    <el-form
        :model="form"
        ref="elPasswordForm"
        size="small"
        style="margin: 20px 0 30px;"
    >
      <el-form-item
          prop="password"
          label="Your Password"
          :rules="[
        { pattern: this.$store.state.password.regExp, message: 'Please enter a valid password', trigger: 'blur'}
      ]"
      >
        <el-input
            v-model="password"
            placeholder="Password"
            type="password"
            :maxlength="25"
        >
        </el-input>
      </el-form-item>
      <div
          v-if="passwordError === true"
          class="tips-error"
      >{{passwordErrorMsg}}
      </div>
    </el-form>

    <el-link type="primary">Forgot password?</el-link>
    <van-button
        size="large"
        class="bottom-btn"
        @click="handleNext"
    >
      Log In
    </van-button>
  </div>
</template>

<script>
export default {
  name: "PasswordLoginForm",
  data() {
    return {
      form: {
      },
      password: "",
      passwordError: false,
      passwordErrorMsg: "Invalid password. Please try again."
    }
  },
  methods: {
    handleNext() {
      if (this.password === "" || !this.$store.state.password.regExp.test(this.password)) {
        this.passwordError = true;
        return false;
      } else {
        this.passwordError = false;
      }
      this.$api
        .merchantLoginPassword({
          phoneNumber: this.$store.state.form.applicantPhoneNumber,
          password: this.password
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$emit("verifyPass", true);
          } else {
            this.passwordError = true;
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

<style lang="scss">
  @import "../assets/css/bottom-btn.scss";

  .verifyOTPForm {
    min-height: 200px;

    .bottom-btn {
      position: absolute;
      bottom: 10px;
      left: 0;
    }

    .label-title {
      font-size: 14px;
      line-height: 24px;
    }

    .resend {
      margin: 0;
      width: 100px;
    }

    .bottom-btn {
      position: absolute;
      bottom: 10px;
      left: 0;
    }

    .tips-error {
      font-size: 14px;
      color: #dd1111;
    }
    .tips-error:before {
      content: url(../assets/imgs/error.svg)
    }
  }
</style>
