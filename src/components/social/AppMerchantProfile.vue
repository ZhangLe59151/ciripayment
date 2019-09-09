<template>
  <div class="appMerchantProfile">
    <div class="merchantTitle">Gaggan Bangkok</div>
    <div class="spanBox" >Resaurant</div>
    <div class="spanBox" >888 Likes</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appMerchantProfile",

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
    }
  }
};
</script>

<style lang="scss" scoped>
.appMerchantProfile {
  position: relative;
  height: 419px;
  width: 100%;
  background-color: white;

  .merchantTitle {
    color: black;
    font-size: 16px;
    max-height: 19px;
    text-align: center;
    font-weight: bolder;
  }

  .spanBox {
    width: 180px;
    height: 40px;
    border: 1px solid #EFF6FF;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #87929D;
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
