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
export default {
  name: "landing-page",
  computed: {
    ...mapState({
      isFirst: "firstLaunch"
    })
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/bottom-btn";
.landing-page {
  background: url("../../assets/imgs/authentication/landBak.png") no-repeat;
  background-size: contain;
  height: 100vh;
  width: 100vw;

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