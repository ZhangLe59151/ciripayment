<template>
  <div class="have-account">
    <van-nav-bar
      title
      left-text="Back"
      right-text="Cancel"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleCancel"
      :border="false"
    ></van-nav-bar>

    <div class="title">A few things before we get started</div>

    <div class="tips">Do you have an account with us?</div>
    <div
      class="box"
      @click="handleSubmit('1')"
    >
      I have an
      <br>existing account.
    </div>
    <div
      class="box"
      @click="handleSubmit('0')"
    >I am new to bank.</div>
    <div class="page">1/3</div>
  </div>
</template>

<script>
// @ is an alias to /src
import util from "@/util.js";

export default {
  name: "have-account",
  components: {},
  data() {
    return {
      active: 0,
      stepperActive: require("@/assets/imgs/stepper_active.png"),
      ls: window.localStorage
    };
  },
  methods: {
    handleCancel() {
      this.$store.commit("ClearForm");
      util.redirectToHome(this);
    },
    handleSubmit(status) {
      this.$store.commit("UpdateForm", { haveBankAccount: status });
      this.ls.setItem("form", JSON.stringify(this.$store.state.form));
      this.$router.push({ name: "BusinessRegister" });
    }
  }
};
</script>

<style lang="scss" scoped>
.have-account {
  text-align: center;
  height: 100%;

  .steps {
    text-align: left;
    width: 80%;
    margin-left: 10%;
  }
  .title {
    font-size: 15px;
    padding: 20px;
  }
  .tips {
    font-size: 27px;
    padding: 20px;
  }
  .page {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }
}
</style>
