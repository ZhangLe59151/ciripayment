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

    <div class="btn">
      <i class="iconfont icontime"/>
      View and Update Records
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      default() {
        return {};
      },
      type: Object
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-home-header {
  background: #ff8600;
  height: 132px;
  width: 100%;
  position: relative;
  color: #ffffff;

  .btn {
    margin: 10px 16px;
    width: calc(100% - 32px);
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 4px;

    font-size: 14px;
    color: #2f3941;
    letter-spacing: 0;
    text-align: center;
    > i {
      color: #ff8600;
      position: relative;
      left: -6px;
    }
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
