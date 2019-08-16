<template>
  <div class="app-loan">
    <app-loan-header v-if="!$route.query.origin" />
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
        Instant Loan
      </div>
    </van-nav-bar>
    <app-loan-overview />
    <app-tab-bar
      :active="1"
      v-if="!$route.query.origin && !$route.query.justSubmitted "
    />
  </div>

</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppLoanHeader from "@/components/AppLoanHeader";
import AppLoanOverview from "@/components/AppLoanOverview";

export default {
  components: {
    AppTabBar,
    AppLoanHeader,
    AppLoanOverview
  },
  name: "Loan",
  created() {
    this.$api.getLoanProfile().then(res => {
      if (res.data.code === 200) {
        this.$store.commit("initLoanProfile", res.data.data);
      }
    });
    // for testing
    // this.$store.commit("fetchDataFromLocal");
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
