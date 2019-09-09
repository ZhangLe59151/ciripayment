<template>
  <div v-if="fetchedData" class="loan-application-result">
    <van-nav-bar
      left-arrow
      @click-left="handleClickBack"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        Application Details
      </div>
    </van-nav-bar>
      <div class="loan-applied-wrapper">
        <div>
          <van-row style="margin-bottom: 14px;"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="loan-heading"
              span="12"
            >{{$t("AppLoanOverview.yourApplication")}}</van-col>
            <van-col :class="formatStatus(loanProfile.status).color +' loan-status'">{{formatStatus(loanProfile.status).label}}</van-col>
          </van-row>
        </div>
        <div>
          <van-row
            class="loan-details"
            type="flex"
            justify="space-between"
          >
            <van-col
              class="label"
              span="7"
            >{{$t("AppLoanOverview.applicationID")}}</van-col>
            <van-col
              class="info"
              span="17"
            >{{loanProfile.applicationId}}</van-col>
          </van-row>

          <van-row
            class="loan-details"
            type="flex"
            justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.applicationTime")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{formatTime(loanProfile.createTime,true)}}</van-col>
          </van-row>

          <van-row v-if="String(loanProfile.status) === '0'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.applicantPhone")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{loanProfile.phoneNumber}}</van-col>
          </van-row>

          <van-row v-if="String(loanProfile.status) !== '0'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.applicant")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{loanProfile.applicant}}</van-col>
          </van-row>

          <van-row v-if="String(loanProfile.status) !== '2'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.applicationAmount")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{formatCurrency(loanProfile.amount)}} {{$store.state.currency}}</van-col>
          </van-row>

          <!--        Only If APPROVED-->
          <van-row v-if="String(loanProfile.status) === '1'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.interestRate")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{loanProfile.loanInterestRate}}</van-col>
          </van-row>
          <van-row v-if="String(loanProfile.status) === '1'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.loanTerm")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{loanProfile.loanTerm}}</van-col>
          </van-row>
          <van-row v-if="String(loanProfile.status) === '1'"
                   class="loan-details"
                   type="flex"
                   justify="space-between"
          >
            <van-col
              class="label"
              span="12"
            >{{$t("AppLoanOverview.repaymentDate")}}</van-col>
            <van-col
              class="info"
              span="12"
            >{{formatTime(loanProfile.firstRepaymentDate)}}</van-col>
          </van-row>

        </div>
        <app-loan-result-msg :status="String(loanProfile.status)"/>
        <van-popup
          v-model="showPopUp"
          class="success-popup"
          position="top"
          :overlay="false"
        >{{$t("AppLoanOverview.submittedNotification")}}</van-popup>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AppLoanResultMsg from "@/components/loan/AppLoanResultMsg";
import util from "@/util";
export default {
  name: "LoanApplicationResult",
  components: { AppLoanResultMsg },
  data() {
    return {
      showPopUp: false,
      fetchedData: false
    };
  },
  computed: {
    ...mapState({
      loanProfile: state => state.loanProfile,
      merchantApplyingChannelStatus: state =>
        state.merchantApplyingChannelStatus,
      OTPVerified: "OTPVerified"
    })
  },
  created() {
    if (this.OTPVerified) {
      // get latest loan application
      if (this.$route.params.id === "latest" || !this.$route.params.id) {
        this.$api.getLatestLoan().then(res => {
          if (res.data.code === 200) {
            this.fetchedData = true;
            this.$store.commit("initLoanProfile", res.data.data);
          } else {
            this.$notify(res.data.msg);
          }
        });
      } else {
        // get loan application by id
        this.$api.getLoanById(this.$route.params.id).then(res => {
          if (res.data.code === 200) {
            this.fetchedData = true;
            this.$store.commit("initLoanProfile", res.data.data);
          } else {
            this.$notify(res.data.msg);
          }
        })
      }
    } else {
      this.$router.push({ name: "LoginPage" });
      this.$notify("Please login first");
    }
    if (this.$route.query.justSubmitted) {
      setTimeout(() => (this.showPopUp = true), 300);
    }
    setTimeout(() => (this.showPopUp = false), 2000);
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
    handleClickBack() {
      if (this.$route.query.justSubmitted) {
        this.$router.push({ name: "Home" });
      } else {
        this.$router.back();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .loan-applied-wrapper {
    padding: 23px 16px 0 16px;
    color: #2f3941;
    .loan-heading {
      font-size: 16px;
      font-weight: bold;
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
    .loan-details {
      border-bottom: 1px solid #d8d8d8;
      margin-top: 15px;
      padding-bottom: 15px;
      .label {
        color: #87929d;
        font-size: 12px;
      }
      .info {
        text-align: right;
        font-size: 14px;
      }
    }
    .back-to-home-btn {
      width: calc(100vw - 32px);
      font-size: 14px;
      height: 40px;
      position: fixed;
      bottom: 16px;
      left: 16px;
    }
    .success-popup {
      text-align: center;
      font-size: 13px;
      padding-top: 13px;
      padding-bottom: 13px;
      top: 44px;
      background-color: #04a777;
      color: white;
    }
  }
</style>
