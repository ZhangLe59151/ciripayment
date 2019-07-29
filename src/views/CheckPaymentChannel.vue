<template>
  <div class="check-payment">
    <van-nav-bar
      right-text="close"
      @click-right="$router.back()"
      :border="false"
    >
    </van-nav-bar>

    <div class="subtitle">
      Your Payment
      <br>
      Channels
    </div>

    <div class="des">
      For issues regarding payment channels,
      <br>
      please contact us at +65 62552023.
    </div>

    <div
      class="box"
      v-for="(item,index) in branchs"
      :key="index"
    >
      <div class="name">{{item.branchNameEn}}</div>
      <div
        class="status"
        v-for="it in formatChannels(item.applicationPaymentChannelVoList)"
        :key="it.id"
      >
        <img :src="it.img">
        <span :class="it.color">{{it.status}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      channels: [
        {
          id: "1",
          name: "visa",
          mdr: "1.20",
          time: "3",
          img: require("../assets/imgs/ico-visa.png"),
          label: "VISA"
        },
        {
          id: "4",
          name: "alipay",
          mdr: "1.20",
          time: "3",
          img: require("../assets/imgs/ico-alipay.png"),
          label: "Alipay"
        },
        {
          id: "5",
          name: "wechatpay",
          mdr: "1.20",
          time: "3",
          img: require("../assets/imgs/ico-wechat.png"),
          label: "Wechat pay"
        },
        {
          id: "2",
          name: "mastercard",
          mdr: "1.20",
          time: "3",
          img: require("../assets/imgs/ico-mastercard.png"),
          label: "Mastercard"
        },
        {
          id: "3",
          name: "promptpay",
          mdr: "1.20",
          time: "3",
          img: require("../assets/imgs/ico-promptpay.png"),
          label: "Promptpay"
        }
      ],
      status: [
        {
          id: "0",
          label: "UNDER REVIEW",
          color: "blue"
        },
        {
          id: "1",
          label: "ENABLED",
          color: "green"
        },
        {
          id: "2",
          label: "REJECTED",
          color: "red"
        }
      ],
      branchs: null
    };
  },
  methods: {
    getInfo() {
      this.$api.getMerchantAccountInfo().then(res => {
        if (res.data.code === 200) {
          this.branchs = res.data.data.branchVos;
        }
      });
    },
    formatChannels(list) {
      const vm = this;
      const channels = JSON.parse(JSON.stringify(this.channels));
      console.log(channels);
      channels.map(item => {
        const channelIndex = _.findIndex(list, { channelId: +item.id });
        console.log(channelIndex);

        const channel = list[channelIndex];
        console.log("channel" + channel);
        const status = channel ? channel.channelStatus : "";

        item.status = "";
        if (status !== "") {
          const statusIndex = _.findIndex(vm.status, { id: status + "" });
          const statusItem = vm.status[statusIndex];
          const statusLabel = statusItem.label;
          item.status = statusLabel;
          item.color = statusItem.color;
        }
      });

      console.log(channels);
      return channels;
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
$blue: #053c5e;
$green: #04a777;
$red: #b41800;
$orange: #fcaa10;

.check-payment {
  margin-bottom: 30px;
  .title {
    background: #ffffff;
    box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.25);
    .title-img {
      width: 20px;
    }
    span {
      font-size: 12px;
      position: relative;
      top: -4px;
      left: 2px;
    }
  }

  .subtitle {
    font-size: 27px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    margin: 20px 0;
  }

  .des {
    font-size: 15px;
    color: #000000;
    letter-spacing: 0.32px;
    text-align: center;
    line-height: 24px;
  }

  .name {
    margin: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .box {
    font-size: 20px;
    color: #053c5e;
    letter-spacing: 0;
    background: #f2f2f2;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px 0;
    .status {
      margin: 20px;
      position: relative;
      img {
        width: 40px;
      }
      span {
        position: absolute;
        right: 0;
        font-family: Helvetica;
        font-size: 13px;
        color: #929292;

        text-align: right;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        &.green {
          color: $green;
        }

        &.red {
          color: $red;
        }

        &.orange {
          color: $orange;
        }
      }
    }
  }
}
</style>
