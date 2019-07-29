<template>
  <div class="view-application">
    <template v-if="page === '1'">

      <van-nav-bar
        right-text="Close"
        @click-right="$router.push({name: 'Welcome'})"
        :border="false"
        title="Application Status"
      />

      <div class="tips">Your Application</div>
      <div class="sub-tips">
        <span>Updated:</span>
        <span>{{updateTime}}</span>
      </div>

      <div class="sub-tips">
        <span>Submitted:</span>
        <span>{{submitTime}}</span>
      </div>

      <div class="ao-card">
        <span>Merchant Profile</span>
        <span :class="aoStatusObj.color">{{aoStatusObj.label}}</span>
      </div>

      <div
        class="card"
        v-for="(item,index) in branchList"
        :key="index"
      >
        <!-- <div class="title">{{item.branchNameEn}}</div> -->
        <div class="title">Payment Channels</div>
        <div
          v-for="it in item.applicationPaymentChannelVoList"
          :key="it.channelId"
          class="channel"
        >
          <img :src="findIconUrl(it.channelId)">
          <span :class="formatStatus(it.channelStatus).color">{{formatStatus(it.channelStatus).label}}</span>
        </div>
      </div>

      <div class="ao-card">
        <span>Marketing Services</span>
        <span :class="aoStatusObj.color">{{aoStatusObj.label}}</span>
      </div>

      <van-button
        v-if="status==='1'"
        size="large"
        class="bottom-btn"
        @click="handleLogin"
      >
        Log into Your Account
      </van-button>
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
      name: "",
      updateTime: "",
      submitTime: "",
      status: this.$store.state.applicationStatus.approved,
      statusWording: this.$store.state.applicationStatusWording.pending,
      page: "2",
      aoStatus: "",
      branchList: [],
      marketingStatusObj: {
        color: "green",
        label: "APPROVED"
      }
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
      this.$api.checkApplictionStatus().then(res => {
        if (res.data.code === 200) {
          this.page = "1";
          this.name = res.data.data.bizNameEn;
          this.submitTime = this.convertUTCTimeToLocalTime(
            res.data.data.createTime
          );
          this.updateTime = this.convertUTCTimeToLocalTime(
            res.data.data.modifyTime
          );

          this.aoStatus = res.data.data.aoStatus;
          this.branchList = res.data.data.branchVos;

          this.status = res.data.data.applicationStatus + "";

          var applicationSatus = res.data.data.applicationStatus + "";
          switch (applicationSatus) {
            case "0":
              this.status = this.$store.state.applicationStatus.pending;
              this.statusWording = this.$store.state.applicationStatusWording.pending;
              break;
            case "1":
              this.status = this.$store.state.applicationStatus.approved;
              this.statusWording = this.$store.state.applicationStatusWording.approved;
              break;
            case "2":
              this.status = this.$store.state.applicationStatus.rejected;
              this.statusWording = this.$store.state.applicationStatusWording.rejected;
              break;
          }
        } else {
          this.page = "2";
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
    },
    handleLogin() {
      this.$router.push({
        name: "AccountLogin"
      });
    }
  },
  created() {
    this.getApplications();
  },
  destroyed() {
    // util.removeCookies("SSID");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.view-application {
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
  .ao-card {
    background: #f2f2f2;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    position: relative;

    > span {
      position: absolute;
      &:first-child {
        font-size: 15px;
        color: #053c5e;
        letter-spacing: 0;
        left: 10px;
        font-weight: bold;
      }

      &:last-child {
        font-size: 13px;
        color: #053c5e;
        letter-spacing: 0;
        right: 10px;
        &.green {
          color: #5ad4af;
        }
        &.red {
          color: #d44832;
        }
        &.gray {
          color: #929292;
        }
      }
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
  .phone {
    font-size: 27px;
    text-decoration: underline;
  }
  .otp {
    text-align: left;
    padding: 0 10%;
  }
  .resend {
    margin: 20px 0;
    text-decoration: underline;
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
