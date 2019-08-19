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
      <div class="group" v-for="(details, key) in list" :key="key">
        <div class="title">{{formatDate(key)}}</div>
        <div class="sum">
          {{sumIncome(details)}}
          <div class="baht">{{$store.state["currency"]}}</div>
        </div>
        <div>
          <van-cell
            v-for="(item, index) in details"
            :key="index"
            :title="formatIncome(item)"
            :label="formatTime(item['createTime'])"
            @click="$router.push({'name':'EditRecord', 'params':{'id':item['id']}})"
            >
            <div slot="default">
	            <span class="positive-amount" v-if="item['type']===0">{{formatAmount(item)}}</span>
              <span class="negtive-amount" v-if="item['type']===1">{{formatAmount(item)}}</span>
              <div class="baht">{{$store.state["currency"]}}</div>
            </div>
          </van-cell>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util.js";

export default {
  name: "RecordList",
  data() {
    return {
      list: {
        // "20190817": [
        //   {
        //     id: 3,
        //     merchantId: 22,
        //     accountDate: "20190817",
        //     amount: 5,
        //     type: 1,
        //     memo: "",
        //     createTime: "2019-08-17T08:04:13.000+0000",
        //     modifyTime: "2019-08-17T08:04:13.000+0000"
        //   },
        //   {
        //     id: 4,
        //     merchantId: 22,
        //     accountDate: "20190817",
        //     amount: 10,
        //     type: 0,
        //     memo: "卖苹果",
        //     createTime: "2019-08-17T08:03:13.000+0000",
        //     modifyTime: "2019-08-17T08:03:13.000+0000"
        //   }
        // ],
        // "20190816": [
        //   {
        //     id: 2,
        //     merchantId: 22,
        //     accountDate: "20190816",
        //     amount: 99,
        //     type: 0,
        //     memo: "卖点卡",
        //     createTime: "2019-08-17T07:57:56.000+0000",
        //     modifyTime: "2019-08-17T07:58:38.000+0000"
        //   }
        // ]
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
    formatDate(date) {
      return this.$moment(date).format("D MMM YYYY");
    },
    formatTime(date) {
      return this.$moment(date).format("D MMM YYYY HH:mm:ss");
    },
    formatIncome(item) {
      if (item["type"] === 0) {
        return item["memo"] == ""
          ? this.$t("Income")
          : this.$t("Income") + " - " + item["memo"];
      } else {
        return item["memo"] == ""
          ? this.$t("Expenses")
          : this.$t("Expenses") + " - " + item["memo"];
      }
    },
    formatAmount(item) {
      if (item["type"] === 0) {
        return "+" + util.fmoney(item["amount"]);
      } else {
        return "-" + util.fmoney(item["amount"]);
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
      let money = util.fmoney(sum);
      return sum < 0 ? money : "+" + money;
    },
    onLoad() {
      this.$api.getRecordList().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data.recordMap;
        } else {
        }
      });
    }
  },
  created() {
    this.onLoad();
  }
};
</script>


<style lang="scss" scoped>
.van-list {
  background-color: #e9ebed;
}
.van-nav-bar {
  height: 44px;
}
.van-cell {
  .van-cell__title > span {
    position: relative;
    top: 4px;
  }
  .van-cell__value > span {
    position: relative;
    top: 11px;
  }
}
.positive-amount {
  color: #b41800;
}
.negtive-amount {
  color: #04a777;
}
.group {
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #2f3941;
  letter-spacing: 0;
  line-height: 47px;
}
.title {
  float: left;
  margin: 18px 16px 8px 16px;
}
.sum {
  float: right;
  font-weight: bold;
  font-size: 16px;
  margin: 18px 16px 8px 16px;
}
.baht {
    float: right;
    font-size: 10px;
    margin-left: 4px;
    color: #000000;
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
