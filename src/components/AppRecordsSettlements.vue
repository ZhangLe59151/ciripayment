<template>
  <div>
    <div
      class="empty-box"
      v-if="list.length === 0"
    >
      Your settlement records will appear here once <br>you start withdrawing to your linked account.
    </div>
    <van-list v-else>
      <div
        v-for="item in list"
        :key="item.id"
        class="tbox"
      >
        <img :src="require('@/assets/imgs/stepper_active.png')">
        <div class="cell">
          <div class="name">Settlement</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div
          class="amount"
          :class="item.status === '0' ? 'failed': '' "
        >
          <div class="value">{{item.value}}</div>
          <div
            class="status"
            v-if="item.status === '0'"
          >{{item.statusLabel}}</div>
        </div>
      </div>
    </van-list>

    <div class="withdraw-box">
      <div class="left-box">
        <div class="name">
          Available Balance (THB)
        </div>
        <div class="amount">1000</div>
      </div>

      <div class="right-box">
        <van-button
          size="small"
          class="withdraw-btn"
          @click="handleWithdraw"
        >
          Withdraw
        </van-button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex";
import { find } from "lodash";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },

  computed: {
    ...mapState({
      paymentChannelList: "paymentChannelList"
    })
  },

  methods: {
    handleWithdraw() {},
    getImgByChannelId(channelId) {
      const item = find(this.paymentChannelList, { id: channelId });
      return item ? item.img : "";
    },
    getNameByType(type, id) {
      const typeList = [
        {
          id: "0",
          label: "Payment"
        },
        {
          id: "1",
          label: "Refund"
        }
      ];

      const item = find(typeList, { id: type });
      return item ? item.label + " - " + id : id;
    },

    getRealValbyType(type, value) {
      return {
        realVal: type === "1" ? "-" + value : "+" + value,
        realValColor: type === "1" ? "red" : ""
      };
    },

    getStatueLabelbyStatus(status) {
      const statusList = [
        {
          id: "0",
          label: "Processing"
        },
        {
          id: "1",
          label: "Success"
        },
        {
          id: "2",
          label: "Failed"
        }
      ];

      const item = find(statusList, { id: status });
      return item ? item.label : status;
    },
    transformData(list) {
      const newList = [];
      list.map(item => {
        item = Object.assign(
          {},
          item,
          this.getRealValbyType(item.type, item.value),
          {
            statusLabel: this.getStatueLabelbyStatus(item.status)
          }
        );
        newList.push(item);
      });

      return newList;
    }
  },
  created() {
    const mockList = require("@/mockData/transactions.json").list;
    this.list = this.list.concat(this.transformData(mockList));
  }
};
</script>

<style lang="scss" scoped>
.empty-box {
  height: 40px;
  margin: 10px 16px;
  padding: 40px 14px;
  font-size: 14px;
  color: #a0b4c0;
  text-align: center;
  border: 1px solid #a0b4c0;
  border-radius: 4px;
  line-height: 20px;
}

.withdraw-box {
  height: 36px;
  margin: 10px 16px;
  width: calc(100% - 60px);
  background: #ffffff;
  border: 1px solid #e9ebed;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: fixed;
  bottom: 60px;
  padding: 14px;
  .left-box {
    width: 50%;
    display: inline-block;
    .name {
      font-size: 12px;
      color: #68737d;
      letter-spacing: 0;
    }

    .amount {
      font-weight: bold;
      font-size: 16px;
      color: #2f3941;
      line-height: 16px;
      position: relative;
      top: 4px;
    }
  }

  .right-box {
    width: 50%;
    display: inline-block;
    text-align: right;
    .withdraw-btn {
      background: #053c5e;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;

      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 20px;
    }
  }
}

.tbox {
  height: 60px;
  margin: 0 16px;
  position: relative;
  border-bottom: 1px solid #e9ebed;
  img {
    height: 20px;
    position: absolute;
    top: 20px;
  }

  .cell {
    position: absolute;
    top: 15px;
    left: 40px;
    .name {
      font-size: 12px;
      color: #2f3941;
      margin-bottom: 3px;
    }

    .time {
      font-size: 12px;
      color: #87929d;
    }
  }

  .amount {
    position: absolute;
    right: 0;
    top: 21px;

    &.failed {
      top: 15px;
      .value {
        margin-bottom: 3px;
      }
    }
    .value {
      font-size: 16px;
      color: #2f3941;
      font-weight: bold;
      &.red {
        color: #b41800;
      }
    }

    .status {
      font-size: 12px;
      color: #87929d;
      text-align: right;
    }
  }
}
</style>

