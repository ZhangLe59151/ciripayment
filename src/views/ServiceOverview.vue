<template>
  <div class="service-overview">
    <template v-if="page === '1'">

      <van-nav-bar
        right-text="Close"
        @click-right="$router.push({name: 'Welcome'})"
        :border="false"
      >

      </van-nav-bar>

      <div class="tips">Service Overview</div>
      <div class="card">
        <div class="title">Payment Channels</div>
        <div
          v-for="it in paymentChannelOverviewVo"
          :key="it.channelId"
          class="channel"
        >
          <img :src="findIconUrl(it.channelId)">
          <strong><span :class="formatStatus(it.status).color">{{formatStatus(it.status).label}}</span></strong>
        </div>
        <van-button
          size="large"
          class="bottom-btn"
        >
          Apply for More Channels
        </van-button>
      </div>

      <div class="card">
        <div class="title"><span style="float:left;">Marketing Services</span>
          <span
            style="float: right;"
            :class="formatStatus(marketingServiceOverviewVo.status).color"
          >{{formatStatus(marketingServiceOverviewVo.status).label}}</span>
        </div>
        <van-button
          size="large"
          class="bottom-btn"
        >
          Apply for Marketing Services
        </van-button>
      </div>

    </template>

    <template v-else-if="page === '2'">
      <van-nav-bar
        right-text="Close"
        @click-right="$router.push({name: 'Welcome'})"
        :border="false"
      />
      <div class="tips">No Application Found</div>
      <div class="sub-tips">
        Explore and apply for our business banking services
        <a
          href="https://www.silot.ai/"
          class="link"
        >here</a> .
      </div>
      <img
        src="../assets/imgs/img-emptybox.png"
        alt
        width="110px"
        style="margin-top: 40px;"
      >
    </template>

    <template v-else>
      <van-loading
        type="spinner"
        color="gray"
        size="50px"
        class="spinner"
      />
    </template>
  </div>
</template>

<script>
import { find } from "lodash";
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: "1",
      paymentChannelOverviewVo: [],
      marketingServiceOverviewVo: {}
    };
  },

  computed: {
    ...mapState({
      aoStatusObj(state) {
        const item = find(state.aoStatus, { id: this.aoStatus + "" });
        return item || state.aoStatus[0];
      },
      paymentChannelStatus: "paymentChannelStatus",
      paymentChannelList: "paymentChannelList"
    })
  },
  methods: {
    formatStatus(status) {
      const item = find(this.paymentChannelStatus, { value: status + "" });
      return item
        ? {
          label: item.label,
          color: item.color
        }
        : {
          label: status,
          color: ""
        };
    },
    findIconUrl(id) {
      const item = find(this.paymentChannelList, { id: id + "" });
      return item.img;
    },
    getApplications() {
      this.page = "1";
      let data = this.$store.state.serviceOverviewVo;
      if (data === undefined || (data.paymentChannelOverviewVo === undefined && data.marketingServiceOverviewVo === undefined)) {
        data = this.retrieveApplication();
      } else {
        this.paymentChannelOverviewVo = data.paymentChannelOverviewVo;
        this.marketingServiceOverviewVo = data.marketingServiceOverviewVo;
      }
    },
    retrieveApplication() {
      this.$api.serviceOverview().then(res => {
        if (res.data.code === 200) {
          this.$store.state.serviceOverviewVo = res.data.data;
          this.paymentChannelOverviewVo = res.data.data.paymentChannelOverviewVo;
          this.marketingServiceOverviewVo = res.data.data.marketingServiceOverviewVo;
          return res.data.data;
        }
      });
    },
    convertUTCTimeToLocalTime(dateTime) {
      if (!dateTime) {
        return "-";
      }
      return this.$moment(dateTime)
        .tz("Asia/Singapore")
        .format("MMMM D YYYY hh:mmA");
    },

    formatFunc(str) {
      return str > 9 ? str : "0" + str;
    }
  },
  created() {
    this.getApplications();
  },
  destroyed() {
    this.$store.state.serviceOverviewVo = {};
    // util.removeCookies("SSID");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";

.bottom-btn {
  border-radius: 0.5rem;
}

.service-overview {
  text-align: center;

  .nav-title {
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

  .card {
    background: #f2f2f2;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    width: 80%;
    margin: 20px auto;
    position: relative;

    .title {
      padding: 15px 10px;
      text-align: left;
      font-weight: bold;
      font-size: 15px;
      color: #053c5e;
      letter-spacing: 0;
    }

    span {
      &.green {
        color: #5ad4af;
      }

      &.red {
        color: #d44832;
      }

      &.gray {
        color: #929292;
      }

      &.blue {
        color: #053c5e;
      }
    }

    .channel {
      position: relative;
      height: 50px;
      line-height: 50px;

      span {
        position: absolute;
        right: 10px;
        font-size: 13px;

        &.green {
          color: #5ad4af;
        }

        &.red {
          color: #d44832;
        }

        &.gray {
          color: #929292;
        }

        &.blue {
          color: #053c5e;
        }
      }

      img {
        height: 30px;
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
  }

  .title {
    font-size: 20px;
    padding: 20px;
  }

  .tips {
    font-size: 27px;
    padding: 20px;
    font-weight: bold;
  }

  .sub-tips {
    font-size: 15px;
    margin: 10px 0;
    height: 20px;
    width: 80%;
    margin-left: 10%;
    position: relative;

    > span {
      font-size: 13px;
      color: #4a4a4a;
      letter-spacing: 0;
      position: absolute;

      &:first-child {
        left: 0;
      }

      &:last-child {
        right: 0;
      }
    }
  }

  .status {
    color: #929292;
    font-size: 13px;
  }

  .status-green {
    background: #5ad4af;
    width: 30px;
    height: 10px;
    display: inline-block;
    border-radius: 14px;
    margin-right: 6px;
  }

  .status-red {
    background: #d44832;
    width: 30px;
    height: 10px;
    display: inline-block;
    border-radius: 14px;
    margin-right: 6px;
  }

  .status-yellow {
    background: #fcaa10;
    width: 30px;
    height: 10px;
    display: inline-block;
    border-radius: 14px;
    margin-right: 6px;
  }

  .card-yellow {
    background-color: #f2f2f2;
  }

  .card-green {
    background-color: #eefcf8;
  }

  .card-red {
    background-color: #faf3f2;
  }

  .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
  }

  .link {
    text-decoration: underline;
  }
}
</style>
