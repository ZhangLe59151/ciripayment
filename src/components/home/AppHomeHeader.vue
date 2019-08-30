<template>
  <div class="app-home-header">
    <div></div>

    <van-row class="info">
      <van-col span="16">
        <div class="income-label">{{$t("Home.income")}}</div>
        <div class="income-value">
          <span>+{{info.income}}</span>
          <span class="income-currency">{{$store.state.currency}}</span>
        </div>
      </van-col>
      <van-col span="8">
        <div class="expenses-label">{{$t("Expenses")}}</div>
        <div class="expenses-value">
          <span>-{{info.expense}}</span>
          <span class="expenses-currency">{{$store.state.currency}}</span>
        </div>
      </van-col>
    </van-row>

    <div>
      <div class="btnView btn"
           @click="$router.push({name: 'RecordList'})"
           v-analytics="{event: 'home_record_history'}">
        <van-icon name="bars"/>
        {{$t('Home.homeRecordViewHistoryBtn')}}
      </div>
      <div class="btnAdd btn"
           @click="$router.push({name: 'AddRecord'})"
           v-analytics="{event: 'home_record_add'}">
        <van-icon name="plus"/>
        {{$t('Home.homeRecordAddBtn')}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    info: {
      default() {
        return {};
      },
      type: Object
    }
  },
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter"
    }),
    date() {
      const today = this.$moment().format(this.localDateFormatter);
      return today;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-home-header {
  background: #ffa702;
  height: 132px;
  width: 100%;
  position: relative;
  color: #ffffff;

  .btn {
    margin: 10px 16px;
    width: calc(50% - 34px);
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 4px;

    font-size: 14px;
    color: #2f3941;
    letter-spacing: 0;
    text-align: center;
    > .van-icon-bars {
      color: #ffa702;
      position: relative;
      left: -6px;
      top: 4px;
      font-size: 18px;
    }
    > .van-icon-plus {
      color: #ffa702;
      position: relative;
      left: -6px;
      top: 4px;
      font-size: 18px;
    }
  }
  .btnView {
    float: left;
  }
  .btnAdd {
    float: right;
  }
  .info {
    margin: 0 16px;
    position: relative;
    height: 52px;
    padding-top: 16px;

    .van-col {
      position: absolute;
    }

    .van-col--16 {
      left: 0;
      bottom: 0;
    }

    .van-col--8 {
      right: 0;
      text-align: right;
      bottom: 0;
    }
    .income-label,
    .expenses-label {
      font-size: 10px;
      position: relative;
      top: -6px;
    }

    .income-value {
      font-size: 32px;
    }

    .expenses-value {
      font-size: 16px;
    }

    .income-currency {
      font-size: 14px;
      position: relative;
      top: -10px;
    }
    .expenses-currency {
      font-size: 14px;
      position: relative;
      top: -4px;
    }
  }
}
</style>
