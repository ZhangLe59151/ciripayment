<template>
  <div class="home">
    <van-nav-bar :border="false">
      <div
        slot="title"
        class="header-title"
      >
        <img
          src="../assets/imgs/bank.png"
          class="header-title-img"
        >
        <span>ABC BANK</span>
      </div>
    </van-nav-bar>

    <div class="title">BUSINESS BANKING</div>
    <div class="tips">
      Welcome.
      <br>How can we help you today?
    </div>

    <div
      class="box"
      @click="$router.push({name: 'ChooseService'})"
    >Apply For Service</div>
    <div
      class="box"
      @click="$router.push({name: 'Login'})"
    >Check Application Status</div>
    <div class="powered">
      <img :src="logo">
      <div>Powered by Silot AI</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;

  .header-title {
    // background: #ffffff;
    box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.25);
    .header-title-img {
      width: 20px;
    }
    span {
      font-size: 12px;
      position: relative;
      top: -4px;
      left: 2px;
    }
  }

  .close {
    text-align: right;
    padding: 10px 10px 0 0;
  }
  .title {
    font-size: 13px;
    padding: 0 20px;
    background-color: #053c5e;
    color: #d8d8d8;
    border: 1px solid #979797;
    vertical-align: middle;
    height: 48px;
    line-height: 48px;
  }
  .tips {
    font-size: 31px;
    padding: 54px 24px 30px;
  }
  .sign-tips {
    text-align: center;
    color: #000;
    font-size: 15px;
    margin-top: 30px;

    .login-link {
      display: block;
      color: #000;
      text-decoration: underline;
    }
  }
  .powered {
    width: 150px;
    height: 22px;
    margin: 50px auto 20px;
    div {
      display: block;
      float: left;
      margin-left: 10px;
      height: 22px;
      color: #929292;
      font-size: 11px;
      line-height: 22px;
    }
    img {
      width: 22px;
      display: block;
      float: left;
    }
  }
}
</style>

<script>
import logo from "@/assets/imgs/logo.png";
export default {
  name: "home",
  components: {},
  data() {
    return {
      logo: logo,
      form: {}
    };
  },
  methods: {},
  created() {
    // Reset form content to clear previous submitted information
    this.$store.commit("ClearForm");
  }
};
</script>
