<template>
  <div class="app-home">
    <home-app-home-header :info.sync="records" />

    <home-app-home-loan />
    <home-app-home-credit />
    <home-app-home-lucky />

    <home-app-home-info />
    <home-app-tab-bar :active="0" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util.js";

export default {
  name: "AppHome",

  data() {
    return {
      applicationStatus: this.$store.state.application.applicationStatus + "",
      hasLoan: false,
      records: {
        income: 0,
        expense: 0
      }
    };
  },
  computed: {
    canClick() {
      return this.applicationStatus === "NOAPPLICATION";
    },
    ...mapState({
      //records(state) {
      //  const recordList = state.recordList;
      //  const month = this.$moment().format("YYYYMM");
      //  const records = {
      //    income: 0,
      //    expense: 0
      //  };
      //  recordList.map(item => {
      //    if (item.date.includes(month)) {
      //      records.income += Number(item.income);
      //      records.expense += Number(item.expense);
      //    }
      //  });
      //  return records;
      //}
    })
  },
  created() {
    this.fetchHomePageData();
  },
  methods: {
    ShowPopup() {
      this.popupStatus = true;
    },
    fetchData(cb) {
      // using api to fetch the merchant Profile
      this.$api
        .getMerchantProfile({
          params: {
            phoneNumber: this.$store.state.userInfo.applicantPhoneNumber
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$store.commit("initMerchantProfile", res.data.data);
          }
          if (cb) {
            cb();
          }
        });
    },
    fetchApplicationStatus() {
      this.$api.getApplictionStatus().then(res => {
        if (res.data.code === 200) {
          this.applicationStatus = res.data.data.applicationStatus + "";
          this.$store.commit("UpdateApplicationInfo", res.data.data);
        }

        if (res.data.code === 10021) {
          this.applicationStatus = "NOAPPLICATION";
        }
      });
    },
    fetchHomePageData() {
      this.$api.getHomePageInfo().then(res => {
        if (res.data.code === 200) {
          this.hasLoan = res.data.data.hasLoan;
          this.records.income = util.fmoney(
            res.data.data.merchantRecordSum.incomeSum
          );
          this.records.expense = util.fmoney(
            res.data.data.merchantRecordSum.expensesSum
          );
        }
      });
    }
  },
  mounted() {
    // this.$store.commit("InitUserInfo");
    //this.fetchHomePageData();
    // if (
    //   Object.entries(this.$store.state.userInfo).length === 0 &&
    //   this.$store.state.userInfo.constructor === Object
    // ) {
    //   this.$router.push({ name: "LandingPage" });
    // } else {
    //   this.fetchData(this.fetchApplicationStatus);
    // }
  }
};
</script>

<style lang="scss" scoped>
.app-home {
  background-color: #f0f7fb;
  // height: 100vh;
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
