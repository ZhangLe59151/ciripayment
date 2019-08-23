<template>
  <div class="app-home-transaction">
    <div class="title">
      Latest Transactions
    </div>

    <div
      class="empty-box"
      v-if="list.length === 0 && type === 'NORMAL'"
    >
      Your transactions will appear here once you <br> start collecting payments.
    </div>
    <van-list v-else>
      <div
        v-for="item in list"
        :key="item.id"
        class="tbox"
      >
        <img :src="item.img">
        <div class="cell">
          <div class="name">{{item.name}}</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div
          class="amount"
          :class="item.status === '2' ? 'failed': '' "
        >
          <div
            class="value"
            :class="item.realValColor"
          >{{item.realVal}}</div>
          <div
            class="status"
            v-if="item.status !== '1'"
          >{{item.statusLabel}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { find } from "lodash";
export default {
  props: {
    searchValue: {
      default: "",
      type: String
    },
    originalList: {
      type: Array
    },
    type: {
      default: "NORMAL",
      type: String
    }
  },
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

      return this.type === "NORMAL" ? item.label : item.label + " - " + id;
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
            img: this.getImgByChannelId(item.channelId),
            name: this.getNameByType(item.type, item.id),
            statusLabel: this.getStatueLabelbyStatus(item.status)
          }
        );
        newList.push(item);
      });

      return newList;
    }
  },

  watch: {
    originalList: {
      handler(val, oldVal) {
        this.list = this.transformData(val);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home-transaction {
  background-color: #f0f7fb;
  padding-bottom: 70px;
  .title {
    font-size: 16px;
    color: #2f3941;
    margin: 16px 24px;
    font-weight: bold;
  }
}

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
    left: 50px;
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
        color: #87929d !important;
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
