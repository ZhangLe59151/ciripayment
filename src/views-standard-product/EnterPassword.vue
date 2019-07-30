<template>
  <div class="enter-password">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      :border="false"
    >
      <div slot="title" class="Silot center"><img src="../assets/imgs/Silot-logo.svg"></div>
    </van-nav-bar>

    <div class="login-title center">
      Log In
    </div>

    <div class="enterPassWrapper">
      <div class="sub-tips">
        Your mobile number
      </div>

      <div class="otp">
        <el-form
          label-width="0px"
          :model="form"
          ref="elForm"
          size="small"
          style="margin-top: 15px;"
        >
          <el-form-item
            label-width="80px"
            class="enterpassword"
            prop="phone"
          >
          <span
            slot="label"
          >
              <span
                style="margin: 0 10px;"
              >{{form.nationalCode}}</span>
            <i class="el-icon-caret-bottom" style="color: #929292"></i>
          </span>
            <el-input
              v-model="form.phone"
              placeholder=""
              :maxlength="this.$store.state.phone.maxLen"
              :minlength="this.$store.state.phone.minLen"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

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

      <div class="resend-active" @click="handleForgot">
        Forgot Password?
      </div>
    </div>

    <van-button
      size="large"
      class="bottom-btn"
      @click=""
      style="width:80%"
    >
      Log In
    </van-button>

    <!--    <div class="page">3/3</div>-->
    <!--    &lt;!&ndash; 数字键盘 &ndash;&gt;-->
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";

  .enter-password {
    background: url("../assets/imgs/MP-background.png");
    min-height: 100vh;
    .van-nav-bar {
      background-color: transparent;
      .Silot {
        padding-top: 10px;
      }
    }

    .bottom-btn{
      background-color: #053C5E;
      border-radius: 4px;
      width: 100%;
      position:fixed;
      bottom: 0;

    }

    .login-title {
      font-size: 24px;
      color: white;
      font-weight: bold;
      margin-top: 3.25rem;
    }

    .enterPassWrapper{
      width: 90%;
      background-color:white;
      position: fixed;
      bottom: 0;
      height: 70%;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding-left: 5%;
      padding-right: 5%;
      padding-top:20px;
      .showingPasswordIcon {
        width: auto;
        height: 100% ;
        color:#A0B4C0;
      }
    }

    .tips {
      font-size: 16px;
      margin-top: 2.25rem;
      margin-bottom: 2.25rem;
    }
    .tips-error {
      font-size: 20px;
      padding: 20px;
      color: #dd1111;
    }

    .sub-tips {
      font-size: 14px;
      margin: 10px 0;
    }

    .phone {
      font-size: 27px;
      text-decoration: underline;
    }

    .otp {
      text-align: left;
    }

    .resend {
      margin: 20px 0;
      text-decoration: none;
      font-size: 14px;
    }
    .resend-active{
      margin: 20px 0;
      text-decoration: none;
      font-size: 14px;
      color:#037AFF;
    }

    .page {
      position: fixed;
      width: 100%;
      text-align: center;
      bottom: 20px;
    }

  }
</style>

<script>
// @ is an alias to /src
import util from "@/util.js";

export default {
  name: "enter-password",
  data() {
    return {
      form: {},
      password: "",
      showingPassword: false,
      passwordType: "password",
      passwordError: false,
      passwordErrorMsg: "Invalid password. Please try again."
    };
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
    },
    toggleShowingPassword() {
      if (this.showingPassword) {
        this.passwordType = "password";
      } else {
        this.passwordType = "text";
      }
      this.showingPassword = !this.showingPassword;
    },
    handleForgot() {
      this.$router.push({
        name: "ForgotPasswordSP"
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

};
</script>
