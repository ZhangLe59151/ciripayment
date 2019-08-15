<template>
  <div class="app-home">
    <app-home-header
      @ShowPopup="ShowPopup"
      :canClick.sync="canClick"
      :info.sync="records"
    />

    <app-home-loan />
    <app-home-lucky />

    <app-home-download v-if="$store.state.deviceType === 'WEB'" />
    <app-home-info />
    <app-tab-bar :active="0" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppHomeLoan from "@/components/AppHomeLoan";
import AppHomeHeader from "@/components/AppHomeHeader";
import AppHomeInfo from "@/components/AppHomeInfo";
import AppHomeLucky from "@/components/AppHomeLucky";

import AppHomeDownload from "@/components/AppHomeDownload";

import { mapState } from "vuex";

export default {
  name: "AppHome",

  components: {
    AppTabBar,
    AppHomeHeader,
    AppHomeDownload,
    AppHomeLoan,
    AppHomeInfo,
    AppHomeLucky
  },
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
    }
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
        }
      });
    },
    getRecordsInfo() {
      const recordList = [
        { date: "20190815", income: "1000", expense: "200", note: "" }
      ];

      const month = this.$moment().format("YYYYMM");
      console.log("====================================");
      console.log(month);
      console.log("====================================");
      recordList.map(item => {
        if (item.date.includes(month)) {
          this.records.income += Number(item.income);
          this.records.expense += Number(item.expense);
        }
      });
    }
  },
  mounted() {
    // this.$store.commit("InitUserInfo");
    this.fetchHomePageData();
    this.getRecordsInfo();
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
