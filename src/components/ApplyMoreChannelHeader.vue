<template>
  <div class="apply-more-channel-header">
    <van-nav-bar class="web-nav"
                 :border="false"
    >
      <van-icon v-if="step==='2'" name="arrow-left" slot="left" @click="clickLeft"/>
      <div slot="title" class="center">Apply More</div>
      <div class="right" slot="right" @click="clickRight">Discard</div>
    </van-nav-bar>
  </div>

</template>

<script>
export default {
  name: "AppServiceManagementHeader",
  props: {
    step: String
  },
  data() {
    return {
      backIcon: require("@/assets/imgs/back.svg")
    }
  },
  methods: {
    clickLeft() {
      (this.step === "2") ? this.$emit("update:step", "1") : this.$router.back();
    },
    clickRight() {
      this.$router.push({ name: "Services" });
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-more-channel-header{
    background-color: #ffffff ;
    font-size: 16px;
    border-bottom: 1px solid #E9EBED;
    padding-bottom: 17px;
    .center{
      color: #2F3941;
    }
    .right {
      color: #87929D;
    }
  }
</style>
