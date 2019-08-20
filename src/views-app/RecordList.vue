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
        {{ formatDate(item.accountDate) }}
        <div class="sum">{{ formatTotalIncome(item.totalIncome) }}</div>
        <div class="baht">{{ $store.state["currency"] }}</div>
        <div class="cell">
          <van-cell
            v-for="record in item.recordList"
            :key="record.id"
            :title="formatIncome(record)"
            :label="formatTime(record.createTime)"
            @click="$router.push({'name':'EditRecord', 'params':{ 'id': record.id }})"
            >
	          <div class="positive-amount" v-if="record.type===0">{{formatAmount(record)}}</div>
            <div class="negtive-amount" v-if="record.type===1">{{formatAmount(record)}}</div>
            <div class="baht">{{$store.state["currency"]}}</div>

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
    formatTotalIncome(number) {
        return util.fmoney(number);
    },
    onLoad() {
      this.$api.getRecordList().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data;
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

.group {
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #2f3941;
  letter-spacing: 0;
  line-height: 47px;
  margin: 0 0 0 0;
  background-color: #e9ebed;
  position: relative;

  .date_title {
    font-size: 10px;
    position: absolute;
    left: 16px;
    top: 10px;
  }

  .sum {
    font-weight: bold;
    font-size: 16px;
    position: absolute;
    right: 56px;
    top: 10px;
  }

  .baht {
    font-size: 10px;
    position: absolute;
    right: 16px;
    top: 10px;
  }
}

.cell {
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #2f3941;
  letter-spacing: 0;
  line-height: 47px;
  margin: 0 0 0 0;
  position: relative;

  .income_title {
    font-size: 16px;
    position: absolute;
    left: 16px;
    top: 0;
  }

  .negtive-amount {
    position: absolute;
    right: 50px;
    top: 10px;
    color: #b41800;
  }

  .positive-amount {
    position: absolute;
    right: 50px;
    top: 10px;
    color: #04a777;
  }

  .baht {
    font-size: 10px;
    position: absolute;
    right: 16px;
    top: 10px;
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
