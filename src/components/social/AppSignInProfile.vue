<template>
  <div class="appSocialSignIn">
    <div :class="isLogin ? 'profileLogin' : 'profile'"></div>
    <van-button class="signInBtn" @click="signIn" v-if="!isLogin">{{ $t('Social.signIn') }}</van-button>
    <van-button class="signInBtn" @click="setUp" v-if="isLogin">{{ $t('Social.setUp') }}</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppSocialSignIn",

  computed: {
    ...mapState({
      isLogin: "OTPVerified"
    })
  },
  methods: {
    signIn() {
      this.$router.push({
        name: "LoginPage",
        query: { to: "SocialHome" }
      });
    },
    setUp() {
      this.$router.push({
        name: "socialSetProfilePage",
        query: { to: "SocialHome" }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appSocialSignIn {
  position: relative;
  height: 200px;
  width: 100%;
  background-color: white;

  .profile {
    position: absolute;
    margin: 22px 135px 0 135px;
    background: url("../../assets/imgs/social/userSignout.png") no-repeat;
    height: 90px;
    width: 90px;
  }

  .profileLogin {
    position: absolute;
    margin: 22px 135px 0 135px;
    background: url("../../assets/imgs/social/userSignIn.png") no-repeat;
    height: 90px;
    width: 90px;
  }

  .signInBtn {
    position: absolute;
    margin: 128px 16px 20px 16px;
    height: 40px;
    width: 328px;
    background-color: #ffa702;
    color: #052d46;
    font-size: 14px;
  }
}
</style>
