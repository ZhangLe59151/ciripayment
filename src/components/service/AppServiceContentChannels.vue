<template>
  <div class="app-service-cnt-channels">
    <div class="block">
      <div class="title">Channels</div>
      <div v-if="workingChannels.length !== 0" class="working-channels">
        <div class="label no-border">
          <span>Your Channels</span>
          <span></span>

        </div>
        <div
          v-for="item in workingChannels"
          :key="item.id"
          class="label"
        >
        <span>
          <img :src="formatChannelLabel(item).img"
                   class="channel-img">
          <div class="channel-label">
          {{formatChannelLabel(item).label}}
          </div>
        </span>
          <span>
            <div :class="formatStatusWorking(item).color + ' status-adjust-height'">{{formatStatusWorking(item).label}}
          </div>
          </span>
        </div>
        <van-button
          size="small"
          class="bottom-btn plain"
          @click="navigateToManageChannels"
        >
          Manage Channels
        </van-button>
      </div>
      <div v-if="appliedChannels.length !== 0" class="applied-channels">
        <div class="label no-border">
          <span>Applied Channels</span>
          <span></span>

        </div>
        <div
          v-for="item in appliedChannels"
          :key="item.id"
          class="label"
        >
        <span>
          <img :src="formatChannelLabel(item).img"
               class="channel-img">
          <div class="channel-label">
          {{formatChannelLabel(item).label}}
          </div>
        </span>
          <span>
            <div :class="formatStatusApplied(item).color + ' status-adjust-height'">{{formatStatusApplied(item).label}}
          </div>
          </span>
        </div>
      </div>
      <div v-if="recommendChannels.length !== 0 && (String(applicationStatus) === '1' || applicationStatus === undefined )" class="recommend-channels">
        <div class="label no-border">
          <span>More Channels</span>
          <span></span>

        </div>
        <img
          v-for="item in recommendChannels"
          :key="item.id"
          :src="formatChannelLabel(item).img"
          class="channel-img"
        />
        <van-button
          size="small"
          class="bottom-btn"
          @click="navigateToApplyMoreChannel"
          :text="formatApplyBtn()"
        >
        </van-button>
      </div>

      <!--      This to avoid the footer cover the app-->
      <div style="height:50px; width:100%; clear:both;"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppServiceContentChannels",
  data() {
    return {
      dialog: false,
      workingChannels: [],
      appliedChannels: [],
      recommendChannels: [
        {
          channelId: "1",
          name: "visa",
          img: require("@/assets/imgs/ico-visa.png"),
          label: "VISA"
        },
        {
          channelId: "2",
          name: "mastercard",
          img: require("@/assets/imgs/ico-mastercard.png"),
          label: "Mastercard"
        },
        {
          channelId: "3",
          name: "promptpay",
          img: require("@/assets/imgs/ico-promptpay.png"),
          label: "Prompt Pay"
        },
        {
          channelId: "4",
          name: "alipay",
          img: require("@/assets/imgs/ico-alipay.png"),
          label: "Alipay"
        },
        {
          channelId: "5",
          name: "wechatpay",
          img: require("@/assets/imgs/ico-wechat.png"),
          label: "WeChat Pay"
        }
      ]
    }
  },
  computed:
    mapState({
      applicationStatus: state => state.application.applicationStatus,
      totalPaymentChannelList: state => state.paymentChannelList,
      merchantApplyingChannelStatus: state => state.merchantApplyingChannelStatus,
      merchantWorkingChannelStatus: state => state.merchantWorkingChannelStatus
    }),
  methods: {
    formatChannelLabel(item) {
      // console.log(this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0]);
      return this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0];
    },
    formatStatusWorking(channel) {
      return this.merchantWorkingChannelStatus.filter(status => String(status.value) === String(channel.channelStatus))[0];
    },
    formatStatusApplied(channel) {
      // if have merchant profile (application apprived )
      if (Object.keys(this.$store.state.merchantProfile).length > 0) {
        return this.merchantApplyingChannelStatus.filter(status =>
          String(status.value) === String(channel.applicationStatus))[0];
      }
      // if no merchant profile ( application not approved yet )
      return this.merchantApplyingChannelStatus.filter(status =>
        String(status.value) === String(channel.channelStatus))[0];
    },
    navigateToManageChannels() {
      this.$router.push({ name: "ManageChannels" });
    },
    fetchData() {
      // if have merchant profile
      if (Object.keys(this.$store.state.merchantProfile).length > 0) {
        let channelList = this.$store.state.merchantProfile.merchantChannelConfigVoList;
        // Get list of working channels and remove from recommend
        this.workingChannels = channelList.filter(channel => {
          if ([1].includes(channel.applicationStatus) && !!channel.channelId) {
            this.recommendChannels = this.recommendChannels.filter(rec => String(rec.channelId) !== String(channel.channelId));
          }
          return [1].includes(channel.applicationStatus) && !!channel.channelId
        });
        // Get list of applied channels and remove from recommend
        this.appliedChannels = channelList.filter(channel => {
          if ([0, 2, 4].includes(channel.applicationStatus) && !!channel.channelId) {
            this.recommendChannels = this.recommendChannels.filter(rec => String(rec.channelId) !== String(channel.channelId));
          }
          return [0, 2, 4].includes(channel.applicationStatus) && !!channel.channelId
        });
      } // no merchant profile, get details from application table, and put all under review
      else {
        let channelList = this.$store.state.application.branchVos[0].applicationPaymentChannelVoList;
        // Get list of applied channels and remove from recommend
        this.appliedChannels = channelList.filter(channel => {
          if ([0].includes(channel.channelStatus) && !!channel.channelId) {
            this.recommendChannels = this.recommendChannels.filter(rec => String(rec.channelId) !== String(channel.channelId));
          }
          return [0].includes(channel.channelStatus) && !!channel.channelId;
        });
      }
      // pass to store to retrieve from apply more page
      this.$store.commit("updateRecommendChannel", this.recommendChannels);
    },
    openSelectChannelDialog() {
      this.dialog = true;
    },
    formatApplyBtn() {
      if (["0", "1"].includes(String(this.applicationStatus))) {
        return "Apply More"
      }
      return "Apply Now"
    },
    navigateToApplyMoreChannel() {
      // if (String(this.applicationStatus) === "1") {
      //   this.$router.push({ name: "ApplyMoreChannel" });
      // } else {
      //   this.$router.push({ name: "EnterInfo" });
      // }
      switch (String(this.applicationStatus)) {
        case "0": { // just submitted application
          break;
        }
        case "1": {
          // approved app
          this.$router.push({ name: "ApplyMoreChannel" });
          break;
        }
        default: {
          this.$router.push({ name: "EnterInfo" });
          break;
        }
      }
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
  .app-service-cnt-channels {
    margin-top:16px;
    padding: 16px;
    .block {

      .title {
        font-size: 16px;
        color: #2f3941;
        letter-spacing: 0;
        font-weight: bold;
      }
      .no-border{
        border: 0px solid white !important;
      }
      .label {
        padding: 16px 0;
        min-height: 16px;
        display: flex;
        border-bottom: 1px solid #e9ebed;

        > span {
          display: inline-block;
          width: 50%;

          .channel-label{
            color: #2F3941;
            font-size: 14px;
            font-weight: bold;
            display: inline-block;
            position: relative;
            top: -6px;

          }

          .status-adjust-height{
            position: relative;
            top: 5px;
          }

          .green {
            color: #5ad4af;
          }

          .red {
            color: #d44832;
          }

          .gray {
            color: #A0B4C0;
          }

          .blue {
            color: #FFA702;
          }

          > i {
            margin-left: 8px;
          }

          &:first-child {
            font-size: 14px;
            color: #87929d;
            letter-spacing: 0;
          }

          &:last-child {
            font-size: 14px;
            color: #2f3941;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
      .bottom-btn {
        font-size: 14px;
        width: 100%;
        margin: 12px 10px 0 0;
        height: 34px;
      }
      .plain{
        color: #FFA702;
        background-color: #ffffff ;
        border-color: #FFA702;
      }
    }

    .applied-channels,.recommend-channels{
      margin-top: 16px;
    }
    .channel-img {
      margin-right:20px;
      width: 48px;
      height: 24px;
      display: inline-block;
    }

    .view-pmt-detail{
      color: #037AFF;
      font-size: 12px;
      margin-top: 31px;
      text-align: center;
    }
  }
</style>
