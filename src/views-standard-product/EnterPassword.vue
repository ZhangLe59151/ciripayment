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
            class="disabled-field"
            prop="phone"
          >
          <span
            slot="label"
          >
              <span
                style="margin: 0 10px;"
              >+66</span>
            <i class="el-icon-caret-bottom" style="color: #053C5E"></i>
          </span>
            <el-input
              v-model="form.phone"
              placeholder="08 1234 1234"
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
            type="password"
            :maxlength="25"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="resend-active">
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

    .disabled-field{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
      span {
        color: #c0c4cc;
      }
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
      password: ""
    };
  }

};
</script>
