<template>
  <div>
    <app-records-header />
    

    

    <app-tab-bar :active="1" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppRecordsHeader from "@/components/AppRecordsHeader";
export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppRecordsHeader
  },

  data() {
    return {
      currentTab: this.$route.query.currentTab || "0",
    };
  }
};
</script>

<style lang="scss" scoped>
.records-search {
  position: relative;

  .van-search {
    position: relative;
    width: 90%;
  }

  .iconFilter {
    position: absolute;
    top: 20px;
    right: 5%;
  }
}

.records-tab {
  .records-tab-header {
    margin: 0 16px;
    font-size: 14px;
    color: #87929d;
    text-align: center;
    display: flex;
    border-bottom: 1px solid #87929d;
    > div {
      width: 50%;
      padding: 10px 0;

      &.tab-active {
        font-size: 14px;
        color: #1f73b7;
        letter-spacing: 0;
        text-align: center;
        border-bottom: 2px solid #1f73b7;
      }
    }
  }
}
</style>
