<template>
  <div class="app-home">
    <app-home-header
      @ShowPopup="ShowPopup"
      :canClick.sync="canClick"
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
      transactionList: require("@/mockData/transactions.json").list
    };
  },
  computed: {
    ...mapState({
      settlementType(state) {
        return state.merchantProfile.merchantSettlementConfigVo
          ? state.merchantProfile.merchantSettlementConfigVo.settlementType + ""
          : "1";
      }
    }),
    appPosition() {
      if (this.$store.state.deviceType !== "APP") {
        return "app-position-web";
      }
      return this.settlementType === "2"
        ? "app-position-auto-settlement"
        : "app-position";
    },
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
    }
  },
  created() {
    this.$store.commit("InitUserInfo");
    if (
      Object.entries(this.$store.state.userInfo).length === 0 &&
      this.$store.state.userInfo.constructor === Object
    ) {
      this.$router.push({ name: "LandingPage" });
    } else {
      this.fetchData(this.fetchApplicationStatus);
    }
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
