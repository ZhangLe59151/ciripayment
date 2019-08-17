<template>
  <div class="record-list">
    <app-common-header title="Records List"/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="no more"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-cell
        class="group"
        v-for="(details, key) in list"
        :key="key"
        :title="formatDate(key)"
        :value="sumIncome(details)"
      >
        <van-cell
          class="detail"
          v-for="(item, index) in details"
          :key="index"
          :title="formatIncome(item)"
          :label="formatDate(item)"
          :value="formatAmount(item)"
        >
          <template slot="default">
            <div>Income - {{item.memo}}</div>
          </template>
        </van-cell>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RecordList",
  data() {
    return {
      list: {
        "20190817": [
          {
            id: 3,
            merchantId: 22,
            accountDate: "20190817",
            amount: 5,
            type: 1,
            memo: "买西瓜",
            createTime: "2019-08-17T08:03:13.000+0000",
            modifyTime: "2019-08-17T08:03:13.000+0000"
          },
          {
            id: 4,
            merchantId: 22,
            accountDate: "20190817",
            amount: 10,
            type: 0,
            memo: "卖苹果",
            createTime: "2019-08-17T08:03:13.000+0000",
            modifyTime: "2019-08-17T08:03:13.000+0000"
          }
        ],
        "20190816": [
          {
            id: 2,
            merchantId: 22,
            accountDate: "20190816",
            amount: 99,
            type: 0,
            memo: "卖点卡",
            createTime: "2019-08-17T07:57:56.000+0000",
            modifyTime: "2019-08-17T07:58:38.000+0000"
          }
        ]
      },
      loading: false,
      finished: false,
      currentNo: 0
    };
  },

  computed: {
    ...mapState({
      recordList: "recordList"
    })
  },

  methods: {
    handleBack() {
      this.$router.push({
        name: "AddRecord",
        query: { date: this.$route.query.date }
      });
    },
    formatDate(item) {
      return this.$moment(item.createTime).format("D MMM YYYY");
    },
    formatIncome(item) {
      console.log(item["type"]);
      if (item["type"] === 0) {
        return item["memo"] == ""
          ? this.$t("Income")
          : this.$t("Income") + " - " + item["memo"];
      } else {
        item["memo"] == ""
          ? this.$t("Expenses")
          : this.$t("Expenses") + " - " + item["memo"];
      }
    },
    formatAmount(item) {
      if (item["type"] === 0) {
        return "+" + item["amount"] + this.$t("currency");
      } else {
        return "-" + item["amount"] + this.$t("currency");
      }
    },
    sumIncome(item) {
      let sum = 0;
      for (let index in item) {
        if (item[index]["type"] === 0) {
          sum += item[index]["amount"];
        } else {
          sum -= item[index]["amount"];
        }
      }
      return sum;
    },
    onLoad() {
      // setTimeout(() => {
      //   const endNo =
      //     this.currentNo + 10 < this.recordList.length
      //       ? this.currentNo + 10
      //       : this.recordList.length;
      //   const startNo = this.currentNo;
      //   this.list = this.list.concat(this.recordList.slice(startNo, endNo));
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= this.recordList.length) {
      //     this.finished = true;
      //   }
      // }, 500);
    }
  },
  created() {
    this.onLoad();
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
  .group {
    font-family: HelveticaNeue;
    font-size: 16px;
    color: #2f3941;
    letter-spacing: 0;
    font-family: HelveticaNeue;
    font-size: 10px;
    color: #2f3941;
    letter-spacing: 0;
    text-align: right;
    line-height: 24px;
    font-family: HelveticaNeue-Bold;
    font-size: 16px;
    color: #2f3941;
    letter-spacing: 0;
    text-align: right;
  }
  .detail {
    background: #ffffff;
    font-family: HelveticaNeue;
    font-size: 10px;
    color: #2f3941;
    letter-spacing: 0;
    text-align: right;
    line-height: 24px;
    font-family: HelveticaNeue;
    font-size: 14px;
    color: #04a777;
    letter-spacing: 0;
    text-align: right;
    font-family: HelveticaNeue;
    font-size: 14px;
    color: #2f3941;
    letter-spacing: 0;
    font-family: HelveticaNeue;
    font-size: 10px;
    color: #87929d;
    letter-spacing: 0;
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
