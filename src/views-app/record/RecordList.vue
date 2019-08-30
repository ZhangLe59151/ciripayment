<template>
  <div class="record-list">
    <app-common-header :title="$t('Record.recordHistory')" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="no more"
      :immediate-check="false"
      @load="onLoad"
      v-if="list && list.length !== 0"
    >
      <div
        class="group"
        v-for="item in list"
        :key="item.accountDate"
      >
        <div class="header">
          <div class="date_title">{{ formatDate(item.accountDate) }}</div>
          <div class="sum">{{ formatTotalIncome(item.totalIncome) }}</div>
          <div class="baht">{{ $store.state["currency"] }}</div>
        </div>

        <div class="cell">
          <van-cell
            v-for="record in item.recordList"
            :key="record.id"
            :title="formatIncome(record)"
            :label="formatTime(record.accountDate)"
            @click="$router.push({'name':'EditRecord', 'params':{ 'id': record.id }})"
          >
            <div
              class="positive-amount"
              v-if="record.type===0"
            >+{{formatAmount(record)}}</div>
            <div
              class="negtive-amount"
              v-if="record.type===1"
            >-{{formatAmount(record)}}</div>
            <div class="baht">{{$store.state["currency"]}}</div>

          </van-cell>
        </div>
      </div>
    </van-list>

    <div
      v-else
      class="empty-box"
    >
      <div>{{$t("Record.emptyMsg")}}</div>
      <div
        class="add-record"
        @click="$router.push({name: 'AddRecord'})"
      >
        <van-icon
          name="plus"
          color="#ff8600"
        />{{$t('Record.addRecord')}}</div>
    </div>
  </div>
</template>

<script>
import util from "@/util";

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

  methods: {
    formatDate(date) {
      return this.$moment(date).format("D MMM YYYY");
    },
    formatTime(date) {
      return this.$moment(date).format("D MMM YYYY HH:mm:ss");
    },
    formatIncome(item) {
      if (item["type"] === 0) {
        return item["memo"] === ""
          ? this.$t("Record.Incomes")
          : this.$t("Record.Incomes") + " - " + item["memo"];
      } else {
        return item["memo"] === ""
          ? this.$t("Record.ExpensesS")
          : this.$t("Record.ExpensesS") + " - " + item["memo"];
      }
    },
    formatAmount(item) {
      return util.fmoney(item["amount"]);
    },
    formatTotalIncome(number) {
      if (number < 0) {
        return util.fmoney(number).replace("-,", "-");
      }
      return util.fmoney(number);
    },
    onLoad() {
      this.$api.getRecordList().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data;
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
.record-list {
  background-color: #e9ebed;
  height: 100vh;
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

  .empty-box {
    font-size: 16px;
    color: #87929d;
    letter-spacing: 0;
    padding: 55px 18px;
    margin: 20px 18px;
    background: #d8d8d8;
    text-align: center;

    .add-record {
      height: 40px;
      line-height: 40px;
      background: #ffffff;
      box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      width: 160px;
      margin: 30px auto 0;
      color: #2f3941;
      letter-spacing: 0;

      .van-icon {
        margin-right: 5px;
        position: relative;
        top: 2px;
      }
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

    .header {
      height: 50px;
    }
    .date_title {
      font-size: 16px;
      position: absolute;
      left: 16px;
      top: 4px;
    }

    .sum {
      font-weight: bold;
      font-size: 16px;
      position: absolute;
      right: 46px;
      top: 4px;
    }

    .baht {
      font-size: 10px;
      position: absolute;
      right: 32px;
      top: 4px;
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
      right: 30px;
      top: 10px;
      color: #b41800;
    }

    .positive-amount {
      position: absolute;
      right: 30px;
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
}
</style>
