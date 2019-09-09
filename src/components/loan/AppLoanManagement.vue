<template>
  <div v-if="fetchedData" class="app-loan-management">
    <div v-show="loanApplicationHistory" class="loan-tab" v-for="loan in loanApplicationHistory" :key="loan.id" @click="handleClick(loan.id)">
      <div>
        <i class="iconfont iconnext"></i>
        <van-row>
          <van-col :class="formatStatus(loan.status).color +' loan-status'">{{formatStatus(loan.status).label}}</van-col>
          <van-col class="loan-time" offset="1">{{formatTime(loan.createTime, true)}}</van-col>
        </van-row>
        <van-row class="loan-details">
          <van-col class="label"
                   span="7">Application ID</van-col>
          <van-col class="info" offset="2"
                   span="14">{{loan.applicationId}}</van-col>
        </van-row>
        <van-row class="loan-details">
          <van-col class="label"
                   span="7">Loan Amount</van-col>
          <van-col class="info" offset="2"
                   span="14">{{formatCurrency(loan.amount)}} {{$store.state.currency}}</van-col>
        </van-row>
      </div>
    </div>
    <van-button
      v-if="displayReApplyButton"
      class="bottom-btn"
      size="large"
      @click="handleReApply"
    >
      Apply Now
    </van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util";

export default {
  name: "AppLoanManagement",
  props: {
    reApply: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fetchedData: false
    }
  },
  computed: {
    ...mapState({
      loanApplicationHistory: "loanApplicationHistory",
      merchantApplyingChannelStatus: state =>
        state.merchantApplyingChannelStatus
    }),
    displayReApplyButton() {
      if (this.loanApplicationHistory !== []) {
        return [2, 3].includes(this.loanApplicationHistory[0].status);
      }
      return true;
    }
  },
  created() {
    // get loan list
    this.$api.getLoanHistory().then(res => {
      if (res.data.code === 200) {
        this.fetchedData = true;
        this.$store.commit("initLoanApplicationHistory", res.data.data);
      }
    });
    // let mockLoanApplicationHistory = [
    //   {
    //     amount: 2500,
    //     applicationId: "201909061037190000",
    //     createTime: "2019-09-06T03:37:19.000+0000",
    //     id: 159,
    //     status: 2
    //   },
    //   {
    //     amount: 50000,
    //     applicationId: "201909061037190001",
    //     createTime: "2019-09-06T03:37:19.000+0000",
    //     id: 160,
    //     status: 1
    //   },
    //   {
    //     amount: 50000,
    //     applicationId: "201909061037190002",
    //     createTime: "2019-09-06T03:37:19.000+0000",
    //     id: 161,
    //     status: 2
    //   }
    // ];
    // this.$store.commit("initLoanApplicationHistory", mockLoanApplicationHistory);
  },
  methods: {
    formatStatus(loanStatus) {
      return this.merchantApplyingChannelStatus.filter(
        status => String(status.value) === String(loanStatus)
      )[0];
    },
    formatTime(time, withHour = false) {
      return util.convertUTCTimeToBuddhistTime(time, withHour);
    },
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
      // change to string
      val = String(val);
      // don't validate empty input
      if (val === "") {
        return;
      }
      if (val.indexOf(".") >= 0) {
        var decimalPos = val.indexOf(".");
        var leftSide = val.substring(0, decimalPos);
        val = leftSide;
      } else {
        val = this.formatNumber(val);
      }
      return val;
    },
    handleClick(id) {
      this.$router.push({ name: "LoanApplicationResult", params: { id: id } });
    },
    handleReApply() {
      event.preventDefault();
      this.$emit("update:reApply", true);
      // this.$router.push({ name: "Loan", query: { reApply: true } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-loan-management {
    padding: 16px;
    .loan-tab{
      background: #FFFFFF;
      border: 1px solid #E9EBED;
      box-shadow: 0 3px 8px -4px rgba(0,0,0,0.20);
      border-radius: 4px;
      letter-spacing: 0;
      margin-bottom: 16px;
      box-sizing: border-box;
      padding: 16px;
      position: relative;
      .iconnext {
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 14px;
        color: #ABB2BA;
      }
      .loan-status {
        text-align: right;
        color: white;
        border-radius: 4px;
        padding: 5px 10px 5px 10px;
        font-size: 12px;
      }
      .green {
        background-color: #04a777;
      }

      .red {
        background-color: #b41800;
      }

      .gray {
        background-color: #a0b4c0;
      }

      .blue {
        background-color: #1f73b7;
      }
      .loan-time{
        font-size: 14px;
        color: #2F3941;
        font-weight: bold;

      }
      .loan-details {
        margin-top: 8px;
        .label {
          color: #87929d;
          font-size: 12px;
        }
        .info {
          text-align: left;
          font-size: 14px;
        }
      }
    }
    .bottom-btn{
      height: 40px;
      line-height: 14px;
      font-size: 14px;
      margin-top: 95px;
      margin-bottom: 70px;
      width: calc(100vw - 32px);
    }
  }
</style>
