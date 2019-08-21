<template>
  <div
    class="app-home-credit"
    :to="{name: 'Credit',query: {origin: 'banner'}}"
    @click="handleCreditClick"
  >
    <div class="des">Find Out Your Credit Limit</div>

    <div class="checkNow">Check Now</div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppHomeCredit",
  computed: {
    ...mapState({
      OTPVerified: "OTPVerified"
    })
  },
  methods: {
    handleCreditClick() {
      if (!this.OTPVerified) {
        this.$router.push({
          name: "LandingPage",
          query: { to: "Credit" }
        });
        return false;
      }

      this.$router.push({ name: "Credit" });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home-credit {
  height: 100px;
  width: 100%;
  background-image: url(../../assets/imgs/home_credit.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 8px;

  .des {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    position: relative;
    width: 112px;
    top: 9px;
    left: 16px;
  }

  .checkNow {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 14px;
    color: #363f47;
    letter-spacing: 0;
    text-align: center;
    line-height: 32px;
    width: 105px;
    height: 32px;
    position: relative;
    top: 17px;
    left: 16px;
  }
}
</style>
