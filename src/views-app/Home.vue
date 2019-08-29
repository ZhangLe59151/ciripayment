<template>
  <div class="app-home">
    <home-app-home-header :info.sync="records" />

    <home-app-home-loan />
    <home-app-home-credit :creditLimit.sync="creditLimit" />
    <home-app-home-lucky />

    <home-app-home-info />
    <app-tab-bar :active="0" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util.js";

export default {
  name: "AppHome",

  data() {
    return {
      hasLoan: false,
      isPersonalQ: false,
      records: {
        income: 0,
        expense: 0
      },
      creditLimit: {}
    };
  },
  computed: {
    ...mapState({
      applicantPhoneNumber: state => userInfo.applicantPhoneNumber,
      firstLaunch: "firstLaunch"
    })
  },
  created() {
    /*if (!this.firstLaunch) {
      this.$store.commit("UnfirstLaunch");
      this.$router.push({ name: "LandingPage" });
    }*/
    this.fetchHomePageData();
  },
  methods: {
    fetchHomePageData() {
      this.$api.getHomePageInfo().then(res => {
        if (res.data.code === 200) {
          const data = res.data.data;
          this.hasLoan = data.hasLoan;
          this.records.income = util.fmoney(data.merchantRecordSum.incomeSum);
          this.records.expense = util.fmoney(
            data.merchantRecordSum.expensesSum
          );

          this.creditLimit = data.creditLimit;
          this.$store.commit("SaveFortuneInfo", {
            fortuneResult: data.fortuneResult
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home {
  background-color: #f0f7fb;
  position: relative;
  margin-bottom: 50px;

  .app-position {
    margin-top: 78px;
  }

  .app-position-auto-settlement {
    margin-top: 98px;
  }

  .app-position-web {
    position: relative;
    top: -60px;
  }
}
</style>
