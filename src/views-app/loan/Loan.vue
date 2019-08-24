<template>
  <div class="app-loan">
    <loan-app-loan-header v-if="!$route.query.origin" />
    <van-nav-bar
      v-else
      :left-arrow="!!$route.query.origin"
      @click-left="$router.push({name: 'Home'})"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        {{$t("LoanTitle")}}
      </div>
    </van-nav-bar>
    <loan-app-loan-overview />
    <app-tab-bar
      :active="1"
      v-if="!$route.query.origin && !$route.query.justSubmitted "
    />
  </div>

</template>

<script>
export default {
  name: "Loan",
  created() {
    this.$api.getLoanProfile().then(res => {
      if (res.data.code === 200) {
        this.$store.commit("initLoanProfile", res.data.data);
      }
    });
    this.$store.commit("fetchDataFromLocal");
  }
};
</script>

<style lang="scss" scoped>
.app-loan {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .header-title {
    font-size: 20px;
    color: white;
    font-weight: bold;
  }
}
</style>
