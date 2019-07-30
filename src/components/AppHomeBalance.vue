<template>
  <div class="app-home-balance">
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
</template>

<script>
export default {
  name: "AppHomeBalance",

  props: {
    settlementType: {
      default: "0",
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
      ]
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
  top: 72px;
  display: flex;

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
  }
}
</style>
