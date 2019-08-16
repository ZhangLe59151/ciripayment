<template>
  <div class="record-list">
    <app-common-header title="Records List" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="no more"
      @load="onLoad"
    >
      <van-cell
        v-for="(item) in list"
        :key="item.date"
        :title="formatDate(item.date)"
      >
        <template slot="default">
          <div>
            {{$t('Income')}}: <span class="custom-income">+{{item.income || 0}}</span>
          </div>

          <div>
            {{$t('Expenses')}}: <span class="custom-expense"> -{{item.expense || 0}}</span>
          </div>

        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      currentNo: 0
    };
  },

  computed: {
    ...mapState({
      recordList: state => state.recordList
    })
  },

  methods: {
    handleBack() {
      this.$router.push({
        name: "AddRecord",
        query: { date: this.$route.query.date }
      });
    },
    formatDate(val) {
      return this.$moment(val).format("D MMM YYYY");
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        const endNo =
          this.currentNo + 10 < this.recordList.length
            ? this.currentNo + 10
            : this.recordList.length;
        const startNo = this.currentNo;

        this.list = this.list.concat(this.recordList.slice(startNo, endNo));
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.recordList.length) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>


<style lang="scss" scoped>
.van-nav-bar {
  height: 44px;
}
.van-cell {
  .van-cell__title > span {
    position: relative;
    top: 14px;
  }
}

.custom-income {
  font-size: 16px;
  color: #04a777;
}
.custom-expense {
  font-size: 16px;
  color: #b41800;
}
</style>
