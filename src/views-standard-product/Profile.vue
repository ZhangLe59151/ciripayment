<template>
  <div class="app-profile">
    <app-profile-header :class="haveStatusForHeader" />
    <app-profile-progress :status="info.status" />
    <app-profile-content :class="haveStatusForCnt" />
    <app-tab-bar :active="3" />

  </div>
</template>

<script>
import AppProfileHeader from "@/components/AppProfileHeader";
import AppProfileContent from "@/components/AppProfileContent";
import AppTabBar from "@/components/AppTabBar";
import AppProfileProgress from "@/components/AppProfileProgress";
export default {
  components: {
    AppProfileHeader,
    AppProfileContent,
    AppTabBar,
    AppProfileProgress
  },
  data() {
    return {
      info: {
        status: "0"
      }
    };
  },
  computed: {
    haveStatusForHeader() {
      return this.haveStatus("app-profile-header-status");
    },
    haveStatusForCnt() {
      return this.haveStatus("app-profile-cnt-status");
    }
  },
  methods: {
    haveStatus(className) {
      return ["0", "1"].includes(this.info.status) ? className : "";
    },
    fetchData() {
      this.$api.checkApplictionStatus().then(res => {
        if (res.data.code === 200) {
        }
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.app-profile {
  background: #f0f7fb;
  position: relative;
  .app-profile-header-status {
    height: 170px;
  }

  .app-profile-cnt-status {
    position: relative;
    top: -70px;
    min-height: 0;
  }
}
</style>
