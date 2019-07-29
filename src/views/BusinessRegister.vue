<template>
  <div class="business-register">
    <van-nav-bar
      title
      left-text="Back"
      right-text="Cancel"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleCancel"
      :border="false"
    />

    <div class="title">
      Do you have a
      <br>business registration?
    </div>

    <div
      class="box"
      @click="handleSubmit('1')"
    >Yes</div>
    <div
      class="box"
      @click="handleSubmit('0')"
    >No</div>
    <div class="page">2/3</div>
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
      active: 1,
      stepperActive: require("@/assets/imgs/stepper_active.png"),
      form: {},
      ls: window.localStorage
    };
  },
  methods: {
    handleCancel() {
      this.$store.commit("ClearForm");
      util.redirectToHome(this);
    },
    handleSubmit(status) {
      this.$store.commit("UpdateForm", { haveBizReg: status });
      this.ls.setItem("form", JSON.stringify(this.$store.state.form));
      this.$router.push({ name: "SendOtp" });
    }
  }
};
</script>

<style lang="scss" scoped>
.business-register {
  text-align: center;
  height: 100%;
  .steps {
    text-align: left;
    width: 80%;
    margin-left: 10%;
  }
  .title {
    font-size: 27px;
    padding: 20px;
  }
  .tips {
    font-size: 18px;
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
