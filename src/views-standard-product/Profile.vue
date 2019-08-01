<template>
  <div v-if="$route.query.applicationStatus === 'no'">
    <app-setting-profile-header />
    <app-setting-profile-progress status="0" />
  </div>

  <div
    class="app-profile"
    v-else
  >
    <template v-if="info.applicationStatus + '' === '0'">
      <app-setting-profile-header />
      <app-setting-profile-progress status="1" />
    </template>
    <template v-else>
      <app-profile-header
        :class="haveStatusForHeader"
        :info.sync="info"
      />
      <app-profile-progress :status.sync="info.applicationStatus + ''" />
      <app-profile-content
        :class="haveStatusForCnt"
        :info.sync="info"
      />
      <app-tab-bar :active="3" />
    </template>

  </div>

</template>

<script>
import AppProfileHeader from "@/components/AppProfileHeader";
import AppProfileContent from "@/components/AppProfileContent";
import AppTabBar from "@/components/AppTabBar";
import AppProfileProgress from "@/components/AppProfileProgress";
import AppSettingProfileHeader from "@/components/AppSettingProfileHeader";
import AppSettingProfileProgress from "@/components/AppSettingProfileProgress";
export default {
  components: {
    AppProfileHeader,
    AppProfileContent,
    AppTabBar,
    AppProfileProgress,
    AppSettingProfileHeader,
    AppSettingProfileProgress
  },
  data() {
    return {
      info: {
        applicationStatus: "0"
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
      return ["1", "2"].includes(this.info.applicationStatus + "")
        ? className
        : "";
    },
    fetchData() {
      this.$api.checkApplictionStatus().then(res => {
        if (res.data.code === 200) {
          this.info = this.transformData(res.data.data);
        }
      });
    },
    transformData(data) {
      return Object.assign({}, data, data.branchVos[0]);
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
