<template>
  <div
    class="app-home-credit"
    :to="{name: 'Credit',query: {origin: 'banner'}}"
    @click="handleCreditClick"
  >
    <div class="des">{{ctx.label}}</div>

    <div class="checkNow">{{ctx.btn}}</div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppHomeCredit",
  props: {
    creditLimit: {
      default() {
        return {};
      },
      required: true
    }
  },
  computed: {
    ...mapState({
      OTPVerified: "OTPVerified"
    }),
    ctx() {
      const kv = {
        "-1": "start",
        "1": "pending",
        "2": "pending",
        "3": "pending",
        "0": "finish"
      };
      const k = this.creditLimit.remaining || -1 + "";

      const ob = {
        start: {
          label: this.$t("Home.creditLimitTitle1"),
          btn: this.$t("Home.creditLimitBtn1")
        },
        pending: {
          label: this.$tc("Home.creditLimitTitle2", k === "1" ? 1 : 2, {
            n: k
          }),
          btn: this.$t("Home.creditLimitBtn1")
        },
        finish: {
          label: this.$t("Home.creditLimitTitle3"),
          btn: this.$t("Home.creditLimitBtn2")
        }
      };

      return ob[kv[k]];
    }
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
  position: relative;

  .des {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    position: relative;
    width: 140px;
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
    padding: 6px 16px;
    position: absolute;
    left: 16px;
    bottom: 16px;
    max-width: 130px;
  }
}
</style>
