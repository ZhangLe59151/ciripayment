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
      <div v-if="recommendChannels.length !== 0" class="recommend-channels">
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
        >
          Apply now
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
      workingChannels: [],
      appliedChannels: [],
      recommendChannels: [{
        channelId: 1
      },{
        channelId: 2
      },{
        channelId: 3
      },{
        channelId: 4
      },{
        channelId: 5
      }]
    }
  },
  computed: {
    ...mapState({
      totalPaymentChannelList: "paymentChannelList",
      paymentChannelStatus: "paymentChannelStatus",
      merchantWorkingChannelStatus: "merchantWorkingChannelStatus",
      // workingChannels: "workingChannels",
      // appliedChannels: "appliedChannels",
      // recommendChannels: "recommendChannels"
    })
  },
  methods: {
    formatChannelLabel(item) {
      // console.log(this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0]);
      return this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0];
    },
    formatStatusWorking(channel) {
      return this.merchantWorkingChannelStatus.filter(status => String(status.value) === String(channel.channelStatus))[0];
    },
    formatStatusApplied(channel) {
      return this.paymentChannelStatus.filter(status => String(status.value) === String(channel.applicationStatus))[0];
    },
    navigateToManageChannels() {
      this.$router.push({ name: "ManageChannels" });
    },
    fetchData() {
      let channelList = this.$store.state.merchantProfile.merchantChannelConfigVoList;
      // Get list of working channels and remove from recommend
      this.workingChannels = channelList.filter(channel => {
        if ([1].includes(channel.applicationStatus)) {
          this.recommendChannels = this.recommendChannels.filter(rec => String(rec.channelId) !== String(channel.channelId));
        }
        return [1].includes(channel.applicationStatus)
      });
      // Get list of working channels and remove from recommend
      this.appliedChannels = channelList.filter(channel => {
        if ([0, 2, 4].includes(channel.applicationStatus)) {
          this.recommendChannels = this.recommendChannels.filter(rec => String(rec.channelId) !== String(channel.channelId));
        }
        return [0, 2, 4].includes(channel.applicationStatus)
      });
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
            color: #053c5e;
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
        color: #053C5E;
        background-color: #ffffff ;
        border-color: #053C5E;
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
