<template>
  <div class="record-list">
    <app-common-header title="Records List" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item) in list"
        :key="item.date"
        :title="item.date"
      >
        <template slot="default">
          <span class="custom-title">Income: {{item.income}}</span>
          <br>
          <span class="custom-title">Expenses: {{item.expense}}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import AppCommonHeader from "@/components/AppCommonHeader";
const recordList = [
  {
    date: "20190917",
    income: "+100",
    expense: "-50"
  },
  {
    date: "20190918",
    income: "+100",
    expense: "-50"
  },
  {
    date: "20190919",
    income: "+100",
    expense: "-50"
  }
];
export default {
  components: {
    AppCommonHeader
  },
  data() {
    return {
      list: recordList,
      loading: false,
      finished: false
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= recordList.length) {
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
</style>
