<template>
  <div>
    <app-records-header />
    <div class="records-search">
      <van-search
        placeholder="Search by Transaction ID"
        v-model="searchValue"
      />
      <i class="iconfont iconFilter"></i>
    </div>

    <div class="records-tab">
      <div class="records-tab-header">
        <div
          :class="currentTab === '0' ? 'tab-active': ''"
          @click="currentTab = '0'"
        >
          Transactions
        </div>
        <div
          :class="currentTab === '1' ? 'tab-active': ''"
          @click="currentTab = '1'"
        >
          Settlements
        </div>
      </div>
      <div class="records-tab-cnt">
        <app-records-transactions v-show="currentTab === '0'" />
        <app-records-settlements v-show="currentTab === '1'" />
      </div>
    </div>

    <app-tab-bar :active="1" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppRecordsHeader from "@/components/AppRecordsHeader";
import AppRecordsTransactions from "@/components/AppRecordsTransactions";
import AppRecordsSettlements from "@/components/AppRecordsSettlements";
export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppRecordsHeader,
    AppRecordsTransactions,
    AppRecordsSettlements
  },

  data() {
    return {
      searchValue: "",
      currentTab: "0"
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

