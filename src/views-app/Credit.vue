<template>
  <div class="credit">
    <van-nav-bar
      @click-left="$router.push({name: 'Home'})"
      :border="false"
      left-arrow
    >
      <div
        slot="title"
        class="header-title"
      >
        Credit Line
      </div>
    </van-nav-bar>

   <app-credit-limit />
    <app-credit-update />
  </div>
</template>

<script>
export default {
  name: "Credit",
  created() {
    this.$store.commit("fetchDataFromLocal");
  }
}
</script>

<style lang="scss" scoped>
  .credit{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
