<template>
  <div class="app-home-header">
    <div>

    </div>

    <van-row class="info">
      <van-col span="16">
        <div>
          {{$t("Income")}}
        </div>
        <div class="income-value">
          <span>+10000000</span>
          <span class="income-currency">฿</span>
        </div>
      </van-col>
      <van-col span="8">
        <div class="expenses-label">
          {{$t("Expenses")}}
        </div>
        <div class="expenses-value">
          <span>-10000</span>
          <span class="expenses-currency">฿</span>
        </div>
      </van-col>
    </van-row>

    <van-button
      icon="star-o"
      type="primary"
    >View and Update Records</van-button>
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
  height: 164px;
  width: 100%;
  position: relative;
  color: #ffffff;
  font-family: HelveticaNeue-Bold;

  .van-button {
    margin: 16px;
    width: calc(100% - 32px);
  }
  .info {
    margin: 0 16px;
    position: relative;
    height: 80px;

    .van-col {
      position: absolute;
      // border-bottom: 1px solid red;
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
