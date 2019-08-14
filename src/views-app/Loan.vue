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
  }
};
</script>
