<template>
  <div
    class="app-home-balance"
    v-if="settlementType === '0'"
  >
    <div
      class="balance"
      v-for="item in list"
      :key="item.label"
    >
      <div class="label">{{item.label}}</div>
      <div class="value">{{item.value}}</div>
      <div class="unit">THB</div>
    </div>
  </div>
  <div
    v-else
    class="app-home-balance app-home-auto-settle"
  >
    <div class="balance">
      <div class="label">{{autoSettle.label}}</div>
      <div class="value">{{autoSettle.value}}</div>
      <div class="unit">THB</div>
      <div class="time">Next Settlement: {{autoSettle.time}}</div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomeBalance",

  props: {
    settlementType: {
      default: "1",
      type: String
    }
  },
  data() {
    return {
      list: [
        {
          label: "Available Balance",
          value: "0.00"
        },
        {
          label: "Incoming Balance",
          value: "0.00"
        }
      ],
      autoSettle: {
        label: "To-Be Settled Amount",
        value: "10,000,000.00",
        time: "2 July 2019, 12:00"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.app-home-balance {
  height: 116px;
  width: calc(100% - 32px);
  margin: 0 16px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(160, 180, 192, 0.2);
  border-radius: 4px;
  position: absolute;
  top: 78px;
  display: flex;
  &.app-home-auto-settle {
    top: 70px;
    height: 140px;
    .balance {
      width: 100%;
      text-align: center;
      margin: 16px 0;
      &:first-child {
        border-right: none;
      }
    }
  }

  .balance {
    width: 50%;
    text-align: center;
    margin: 16px 0;
    &:first-child {
      border-right: 0.5px solid #a0b4c0;
    }
    .label {
      font-size: 14px;
      color: #000000;
    }

    .value {
      font-size: 24px;
      color: #2f3941;
      margin-top: 12px;
    }

    .unit {
      font-size: 12px;
      color: #68737d;
      margin-top: 4px;
    }

    .time {
      margin-top: 10px;
      font-size: 12px;
      color: #87929d;
      letter-spacing: 0;
    }
  }
}
</style>
