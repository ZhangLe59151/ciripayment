<template>
  <div class="app-loan">
    <app-loan-header />
    <app-loan-overview />
    <app-tab-bar :active="1" />
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
