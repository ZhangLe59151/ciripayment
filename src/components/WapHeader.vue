<template>
  <van-nav-bar class="web-nav"
    :border="false"
  >
    <van-icon v-if="left" name="arrow-left" slot="left" @click="clickLeft"/>
    <div v-if="center" slot="title" class="Silot center"><img src="../assets/imgs/Silot-logo.svg"></div>
    <van-icon v-if="right" name="cross" slot="right" @click="clickRight"/>
  </van-nav-bar>
</template>

<script>
export default {
  name: "WapHeader",
  props: {
    left: Boolean,
    center: Boolean,
    right: Boolean
  },
  methods: {
    clickLeft() {
      this.$router.back()
    },
    clickRight() {
      this.$store.commit("ClearForm");
      this.$router.push({ name: "LandingPage" });
    }
  }
}
</script>

<style lang="scss" scoped>
  .Silot {
    position: relative;
    top: 10px;
  }
</style>
