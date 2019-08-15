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
        v-for="item in list"
        :key="item"
        title="2019/09/01"
      >
        <template slot="default">
          <span class="custom-title">Income: {{item}}</span>
          <br>
          <span class="custom-title">Expenses: {{item}}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import AppCommonHeader from "@/components/AppCommonHeader";
export default {
  components: {
    AppCommonHeader
  },
  data() {
    return {
      list: [],
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
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>


<style lang="scss" scoped>
.van-nav-bar {
}
</style>
