<template>
  <div class="app-search">
    <app-search-header title="Search Records" />
    <div class="records-search">
      <van-search
        placeholder="Search by Transaction ID"
        v-model="searchValue"
        @keypress.enter="handleSearch"
      />
      <i class="iconfont iconFilter"></i>
    </div>

    <div class="records-tab-cnt">
      <app-records-transactions
        v-if="currentTab === '0'"
        :searchValue="searchValue"
        :originalList.sync="list"
        type="SEARCH"
      />
      <app-records-settlements
        v-else
        :searchValue="searchValue"
        :originalList.sync="list"
        type="SEARCH"
      />
    </div>
  </div>
</template>

<script>
import AppSearchHeader from "@/components/AppSearchHeader";
import AppRecordsTransactions from "@/components/AppRecordsTransactions";
import AppRecordsSettlements from "@/components/AppRecordsSettlements";
export default {
  name: "Search",
  components: {
    AppSearchHeader,
    AppRecordsTransactions,
    AppRecordsSettlements
  },
  data() {
    return {
      searchValue: "",
      currentTab: this.$route.query.currentTab,
      transactionMockList: require("@/mockData/transactions.json").list,
      settlementMockList: require("@/mockData/transactions.json").list,
      list: [],
      searching: false
    };
  },
  methods: {
    handleSearch() {
      if (!this.searchValue) {
        this.list = [];
        return false;
      }
      const currentTab = this.currentTab;
      this[currentTab === "0" ? "searchTransactions" : "searchSettlements"]();
    },
    searchTransactions() {
      this.list = this.transactionMockList.filter(el =>
        el.id.includes(this.searchValue)
      );
    },
    searchSettlements() {
      this.list = this.settlementMockList.filter(el =>
        el.id.includes(this.searchValue)
      );
    }
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
.app-search {
}
</style>
