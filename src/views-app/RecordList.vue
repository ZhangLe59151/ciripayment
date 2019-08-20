<template>
  <div class="record-list">
    <app-common-header title="Records History"/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="no more"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="group" 
        v-for="item in list"
        :key="item.accountDate">
        {{formatDate(item.accountDate)}}
        <div class="baht">{{$store.state["currency"]}}</div>
        <div>
        <!--  <van-cell
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
          </van-cell>  -->
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
      list: [],
      loading: false,
      finished: false,
      currentNo: 0
    };
  },

  computed: {
    ...mapState({
      recordList: "recordList",
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
          this.list = res.data.data;
          debugger
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
.negtive-amount {
  color: #b41800;
}
.positive-amount {
  color: #04a777;
}
.group {
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #2f3941;
  letter-spacing: 0;
  line-height: 47px;
  margin: 0 0 0 0;
  background-color: #e9ebed;
  position: relative;

  

  .baht {
    font-size: 10px;
    position: absolute;
    right: 16px;
    top: 10px;
  }
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


.custom-income {
  font-size: 16px;
  color: #04a777;
}
.custom-expense {
  font-size: 16px;
  color: #b41800;
}
</style>
