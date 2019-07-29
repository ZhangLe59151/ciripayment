<template>
  <div class="account-info">
    <van-nav-bar
      title
      right-text="Logout"
      @click-right="handleLogout"
      :border="false"
    />
    <div class="title">Your Business</div>

    <div class="account-box">
      <div class="subtitle">AVAILABLE BALANCE</div>
      <div class="amount">
        {{currency}}
        <span>{{balance}}</span>
      </div>
    </div>

    <div class="account-box">
      <div class="subtitle">TOTAL LIABILITIES</div>
      <div class="amount">
        {{currency}}
        <span style="color: #929292;">{{balance}}</span>
      </div>
    </div>

    <div class="account-list">
      <div
        class="account-item"
        v-for="item in accountList"
        :key="item.id"
      >
        <div class="account-name">{{item.name}}</div>
        <div class="account-no">{{item.accountNo}}</div>
        <div>
          <ul style="display: flex; width: 90%;font-size: 15px;color: #929292;margin: 20px 0 10px;">
            <li style="text-align:right;flex: 4;">Total Balance</li>
            <li style="text-align:right;flex: 1;"></li>
            <li style="text-align:right;flex: 5">Available Balance</li>
          </ul>
          <ul style="display: flex; width: 90%; margin-bottom: 10px;">
            <li style="text-align:right;flex: 4;">{{item.total}} THB</li>
            <li style="text-align:right;flex: 1;"></li>
            <li style="text-align:right;flex: 5">{{item.total}} THB</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="main-title">Latest Transactions</div>

    <div class="trx-list">
      <ul class="trx-head">
        <li class="trx-date">Date</li>
        <li class="trx-des">Description</li>
        <li class="trx-amount">Amount</li>
      </ul>
      <!--
      <ul class="trx-item">
        <li class="trx-date">2019-09-10</li>
        <li class="trx-des">121212212</li>
        <li class="trx-amount">12.20</li>
      </ul>
      -->
      <div class="no-data">No transactions.</div>
    </div>

    <div class="main-title">Payment Channel</div>
    <div class="payment-list">
      <div
        class="payment-item"
        v-for="(item,index) in PaymentChannelFormaterList"
        :key="index"
      >
        <img
          :src="item.imgSrc"
          alt
          width="60px"
          height="30px"
        >
        <span>&nbsp;</span>
        <span :class="item.className">
          {{item.label}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Idle } from "idlejs/dist";
import util from "@/util.js";
import { find } from "lodash";

export default {
  data() {
    return {
      currency: "THB",
      balance: "0",
      alipayIcon: require("@/assets/imgs/ico-alipay.png"),
      mastercardIcon: require("@/assets/imgs/ico-mastercard.png"),
      visaIcon: require("@/assets/imgs/ico-visa.png"),
      wechatpayIcon: require("@/assets/imgs/ico-wechat.png"),
      promptpayIcon: require("@/assets/imgs/ico-promptpay.png"),
      paymentChannelStatus: this.$store.state.paymentChannelStatus,
      alipayStatus: this.$store.state.paymentChannelStatus.pending,
      mastercardStatus: this.$store.state.paymentChannelStatus.pending,
      visaStatus: this.$store.state.paymentChannelStatus.pending,
      wechatpayStatus: this.$store.state.paymentChannelStatus.pending,
      promptpayStatus: this.$store.state.paymentChannelStatus.pending,
      statusLabel: "xxx",
      accountList: [
        {
          name: "ABC Savings",
          accountNo: "301-XXXXX-1234",
          total: "0",
          available: "0"
        },
        {
          name: "ABC Checking",
          accountNo: "301-XXXXX-5678",
          total: "0",
          available: "0"
        }
      ],
      idleTimer: null,
      PaymentChannelFormaterList: []
    };
  },
  computed: {
    promptpayStatusFormater() {
      return this.paymentChannelStatusFormater(this.promptpayStatus);
    },
    wechatpayStatusFormater() {
      return this.paymentChannelStatusFormater(this.wechatpayStatus);
    },
    alipayStatusFormater() {
      return this.paymentChannelStatusFormater(this.alipayStatus);
    },
    mastercardStatusFormater() {
      return this.paymentChannelStatusFormater(this.mastercardStatus);
    },
    visaStatusFormater() {
      return this.paymentChannelStatusFormater(this.visaStatus);
    }
  },

  mounted() {
    this.getAccountInfo();
    window.scrollTo(0, 0);
    if (!this.idleTimer) {
      this.idleTimer = new Idle()
        .whenNotInteractive()
        .within(this.$store.state.idleTime, 1000) // minute
        .do(() => {
          console.log("EnterInfo page idle");

          util.redirectToHome(this, this.$store.state.messages.idleTimeout);
        });
    }
    console.log("idletimer start enter info");

    this.idleTimer.start();
  },
  beforeDestroy() {
    if (this.idleTimer) {
      console.log("idle timer stop enter info");

      this.idleTimer.stop();
    }
  },
  destroyed() {
    util.removeCookies("SSID");
  },
  methods: {
    initPaymentChannelFormaterList() {
      this.PaymentChannelFormaterList = [
        {
          imgSrc: this.visaIcon,
          className: this.visaStatusFormater.className,
          label: this.visaStatusFormater.label
        },
        {
          imgSrc: this.mastercardIcon,
          className: this.mastercardStatusFormater.className,
          label: this.mastercardStatusFormater.label
        },
        {
          imgSrc: this.promptpayIcon,
          className: this.promptpayStatusFormater.className,
          label: this.promptpayStatusFormater.label
        },
        {
          imgSrc: this.alipayIcon,
          className: this.alipayStatusFormater.className,
          label: this.alipayStatusFormater.label
        },
        {
          imgSrc: this.wechatpayIcon,
          className: this.wechatpayStatusFormater.className,
          label: this.wechatpayStatusFormater.label
        }
      ];
    },
    paymentChannelStatusFormater(status) {
      const item = find(this.paymentChannelStatus, {
        value: status
      });

      return {
        className: {
          [!item ? "" : "payment-status-" + item.name]: true
        },
        label: !item ? "" : item.label
      };
    },
    getAccountInfo() {
      this.$api.getAccountInfo().then(res => {
        if (res.data.code === 200) {
          var channels = res.data.data.channels;
          channels.forEach(ch => {
            var chId = ch.channelId + "";
            switch (chId) {
              case this.$store.state.paymentChannelIds.visa:
                this.visaStatus = ch.channelStatus + "";
                break;
              case this.$store.state.paymentChannelIds.mastercard:
                this.mastercardStatus = ch.channelStatus + "";
                break;
              case this.$store.state.paymentChannelIds.alipay:
                this.alipayStatus = ch.channelStatus + "";
                break;
              case this.$store.state.paymentChannelIds.wechatpay:
                this.wechatpayStatus = ch.channelStatus + "";
                break;
              case this.$store.state.paymentChannelIds.promptpay:
                this.promptpayStatus = ch.channelStatus + "";
                break;
            }
          });

          this.initPaymentChannelFormaterList();
        } else {
          this.$notify({
            message: res.data.msg,
            duration: 1000
          });
          return false;
        }
      });
    },
    handleLogout() {
      var cName = "SSIE";
      var cValue = "";
      var arr;
      if ((arr = document.cookie.match("SSIE"))) {
        cValue = arr[2];
      }

      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      if (cValue !== "") {
        document.cookie =
          cName + "=" + cValue + ";expires=" + exp.toGMTString();
      }

      util.redirectToHome(this);
    }
  }
};
</script>

<style lang="scss" scoped>
.account-info {
  padding: 24px;
  background-color: #fff;

  .main-title {
    font-size: 21px;
    margin-top: 30px;
  }
  .payment-item {
    height: 64px;
    line-height: 64px;
    background: #fff;
    box-shadow: 0 2px 13px -10px #000;
    position: relative;
    margin-top: 10px;
    > span {
      display: inline-block;
      height: 64px;
      line-height: 64px;
      margin-left: 30px;
      font-size: 15px;
      &.payment-status-pending {
        font-size: 13px;
        position: absolute;
        right: 16px;
        color: #929292;
      }
    }
    > img {
      position: relative;
      top: 10px;
      left: 16px;
    }
  }
  .payment-item {
    height: 64px;
    line-height: 64px;
    background: #fff;
    box-shadow: 0 2px 13px -10px #000;
    position: relative;
    margin-top: 10px;
    > span {
      display: inline-block;
      height: 64px;
      line-height: 64px;
      margin-left: 30px;
      font-size: 15px;
      &.payment-status-enabled {
        font-size: 13px;
        position: absolute;
        right: 16px;
        color: #5ad4af;
      }
    }
    > img {
      position: relative;
      top: 10px;
      left: 16px;
    }
  }
  .payment-item {
    height: 64px;
    line-height: 64px;
    background: #fff;
    box-shadow: 0 2px 13px -10px #000;
    position: relative;
    margin-top: 10px;
    > span {
      display: inline-block;
      height: 64px;
      line-height: 64px;
      margin-left: 30px;
      font-size: 15px;
      &.payment-status-rejected {
        font-size: 13px;
        position: absolute;
        right: 16px;
        color: #d44832;
      }
    }
    > img {
      position: relative;
      top: 10px;
      left: 16px;
    }
  }

  .trx-list {
    min-height: 60px;
    background: #fff;
    padding: 15px 10px;
    box-shadow: 0 2px 13px -10px #000;
    position: relative;
    margin-top: 10px;

    .trx-head {
      display: flex;
      text-align: center;
      padding-bottom: 5px;
      border-bottom: 1px solid #d7d7d7;
      font-size: 13px;
      color: #929292;
      .trx-date {
        flex: 1;
      }
      .trx-des {
        flex: 2;
      }
      .trx-amount {
        flex: 1;
      }
    }
    .trx-item {
      display: flex;
      text-align: center;
      font-size: 13px;
      color: #929292;
      .trx-date {
        flex: 1;
      }
      .trx-des {
        flex: 2;
      }
      .trx-amount {
        flex: 1;
      }
    }
    .no-data {
      font-size: 15px;
      color: #000;
      text-align: center;
      margin-top: 15px;
    }
  }
  .title {
    font-size: 27px;
  }

  .account-box {
    text-align: center;
    height: 150px;
    background: #fff;
    -moz-box-shadow: 0 2px 13px -10px #000;
    -webkit-box-shadow: 0 2px 13px -10px #000;
    box-shadow: 0 2px 13px -10px #000;
    position: relative;
    margin-top: 20px;
    .subtitle {
      font-size: 13px;
      position: absolute;
      top: 24px;
      width: 100%;
    }

    .amount {
      position: absolute;
      top: 55px;
      width: 100%;
      font-size: 15px;
      color: #929292;
      > span {
        font-size: 50px;
        color: #5ad4af;
        vertical-align: middle;
      }
    }
  }

  .account-list {
    margin-top: 34px;
    .account-item {
      border-bottom: 1px solid #929292;
      margin: 16px 0;
      .account-name {
        font-size: 17px;
      }

      .account-no {
        font-size: 15px;
        color: #053c5e;
        text-decoration: underline;
      }
    }
  }
}
</style>
