<template>
  <div class="app-loan">
    <loan-app-loan-header v-if="!$route.query.origin" :title="(showLoanOverview)?'Loan':'Loan Application History'"/>
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
        Loan
      </div>
    </van-nav-bar>
    <loan-app-loan-overview v-if="showLoanEnterAmount"></loan-app-loan-overview>
    <loan-app-loan-management v-else></loan-app-loan-management>
    <app-tab-bar
      :active="1"
      v-if="!$route.query.origin && !$route.query.justSubmitted "
    />
  </div>

</template>

<script>
export default {
  name: "Loan",
  data() {
    return {
      noLoan: true,
      showLoanEnterAmount: true,
    }
  },
  computed: {
    showLoanOverview() {
      return !this.noLoan || this.$route.query.reApply;
    }
  },
  watch: {
    showLoanOverview(newv, oldv) {
      console.log("current", newv);
    }
  },
  created() {
    if (this.$store.state.OTPVerified) {
      // else check if have loan
      this.$api.getLatestLoan().then(res => {
        if (res.data.code === 200) {
          if (res.data.data) {
            this.noLoan = false;
            this.showLoanEnterAmount = false;
            this.$store.commit("initLoanProfile", res.data.data);
          }
        }
      });
    }
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
