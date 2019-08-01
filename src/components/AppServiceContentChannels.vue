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
            <div :class="formatStatus(item).color + ' status-adjust-height'">{{formatStatus(item).label}}
          </div>
          </span>
        </div>
        <van-button
          size="small"
          class="bottom-btn plain"
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
            <div :class="formatStatus(item).color + ' status-adjust-height'">{{formatStatus(item).label}}
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
      <div class="view-pmt-detail">
        Click here to view payment channel details.
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppServiceContentChannels",
  data() {
    return {
      channelOverView: [
        {
          "channelId": "1",
          "status": "0"
        },
        {
          "channelId": "2",
          "status": "-1"
        },
        {
          "channelId": "3",
          "status": "2"
        },
        {
          "channelId": "4",
          "status": "1"
        },
        {
          "channelId": "5",
          "status": "3"
        }
      ],
      workingChannels: [{ id: "4", status: "1" }, { id: "5", status: "3" }],
      appliedChannels: [{ id: "1", status: "0" }, { id: "3", status: "2" }],
      recommendChannels: [{ id: "2" }]
    }
  },
  computed: {
    ...mapState({
      totalPaymentChannelList: "paymentChannelList",
      paymentChannelStatus: "paymentChannelStatus"
    })
    // TODO: This to be replace by fetching data
  },
  methods: {
    formatChannelLabel(item) {
      return this.totalPaymentChannelList.filter(channel => channel.id === item.id)[0];
    },
    formatStatus(channel) {
      return this.paymentChannelStatus.filter(status => status.value === channel.status)[0];
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-service-cnt-channels {
    margin-top:16px;
    padding: 16px;
    margin-bottom: 50px;
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
        margin: 12px 10px 31px 0;
        height: 34px;
      }
      .plain{
        color: #053C5E;
        background-color: #ffffff ;
        border-color: #053C5E;
      }
    }

    .recommend-channels{
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
      text-align: center;
    }
  }
</style>
