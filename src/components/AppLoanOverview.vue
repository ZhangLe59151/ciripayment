<template>
 <div v-if="!loanProfile || Object.keys(loanProfile).length === 0" class="app-loan-overview">
   <div class="banner">
     <div class="banner-title">
       {{$t("AppLoanOverview.bannerTitle")}}
     </div>
     <div class="banner-number">
       100,000 ฿
     </div>
   </div>
   <div class="ribbon">
    <div class="lower-rate">
      <i
        class="iconfont iconcheck"
      />
      <div>{{$t("AppLoanOverview.lowerRate")}}</div>
    </div>
     <div class="higher-limit">
       <i
         class="iconfont iconcheck"
       />
       <div>{{$t("AppLoanOverview.higherLimit")}}</div>
     </div>
     <div class="faster-approval">
       <i
         class="iconfont iconcheck"
       />
       <div>{{$t("AppLoanOverview.fasterApproval")}}</div>
     </div>
   </div>
   <div class="instruction">
    <div class="instruction-title">
      {{$t("AppLoanOverview.instructionTitle")}}
    </div>
     <div class="instruction-content-1">
       {{$t("AppLoanOverview.instructionContent1")}}
     </div>
     <ul class="instruction-content-2">
       <li><span>{{$t("AppLoanOverview.instructionContent2.personalDetails")}}</span></li>
       <li><span>{{$t("AppLoanOverview.instructionContent2.bizInfo")}}</span></li>
       <li><span>{{$t("AppLoanOverview.instructionContent2.photos")}}</span></li>
     </ul>
     <div class="instruction-content-3">
       Tap <span style="font-weight: bold">Start Now</span> to begin applying!
     </div>
   </div>
   <div class="loan-terms">
     <div class="loan-terms-title">
       Loan Terms
     </div>
     <div class="loan-terms-content-1">
       The base loan amount is <b>5,000 ฿</b> without any profile information.
     </div>
     <div class="loan-terms-content-2">
       Low interest rates from <b>3.7% p.a. (EIR 7% p.a.).</b>
     </div>
     <div class="loan-terms-content-3">
       From <b>1 minute</b> approval in-principle.
     </div>
     <van-button
       size="small"
       class="bottom-btn"
       @click="handleStart"
     >
       Start Now
     </van-button>
   </div>
 </div>
  <div v-else class="app-loan-overview">
    <div class="loan-applied-wrapper">
      <div>
        <van-row type="flex" justify="space-between">
          <van-col class="loan-heading" span="12">
            Your Application
          </van-col>
          <van-col :class="formatStatus(loanProfile.status).color +' loan-status'">
            {{formatStatus(loanProfile.status).label}}
          </van-col>
        </van-row>

      </div>
      <div>
        <van-row class="loan-details" type="flex" justify="space-between">
          <van-col class="label" span="12">
            Applicant Mobile Number
          </van-col>
          <van-col class="info" span="12">
            {{loanProfile.phoneNumber}}
          </van-col>
        </van-row>

        <van-row class="loan-details" type="flex" justify="space-between">
          <van-col class="label" span="12">
            Application Time
          </van-col>
          <van-col class="info" span="12">
            {{this.$moment(loanProfile.createTime).format("DD MMM YYYY, HH:ss")}}
          </van-col>
        </van-row>

        <van-row class="loan-details" type="flex" justify="space-between">
          <van-col class="label" span="12">
            Application Amount
          </van-col>
          <van-col class="info" span="12">
            {{formatCurrency(loanProfile.amount)}} ฿
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppLoanOverview",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      loanProfile: state => state.loanProfile,
      merchantApplyingChannelStatus: state => state.merchantApplyingChannelStatus
    })
  },
  methods: {
    handleStart() {
      this.$router.push({ name: "EnterLoanInfo" });
    },
    formatStatus(loanStatus) {
      return this.merchantApplyingChannelStatus.filter(status => String(status.value) === String(loanStatus))[0];
    },
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    formatCurrency(val) {
      // change to string
      val = String(val);
      // don't validate empty input
      if (val === "") { return; }

      // check for decimal
      if (val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimalPos = val.indexOf(".");

        // split number by decimal point`
        var leftSide = val.substring(0, decimalPos);
        var rightSide = val.substring(decimalPos);

        // add commas to left side of number
        leftSide = this.formatNumber(leftSide);

        // validate right side
        rightSide = this.formatNumber(rightSide);

        // Limit decimal to only 2 digits
        rightSide = rightSide.substring(0, 2);

        // join number by .
        val = leftSide + "." + rightSide;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        val = this.formatNumber(val);
      }
      // send updated string to input
      return val;
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-loan-overview{

    .banner{
      height: 138px;
      background: url("../assets/imgs/loan.png") no-repeat;
      background-size: cover;
      color: #363F47;
      text-align: center;
      padding: 26px 0px 45px 0px ;
      box-sizing: border-box;
      .banner-title{
        font-size: 16px;
        font-weight: bold;
      }
      .banner-number{
        font-size:32px;
        font-weight: bold;
      }
    }

    .ribbon{
      height: 60px;
      background: url("../assets/imgs/ribbon.png") no-repeat;
      background-size: cover;
      position: relative;
      top: -35px;
      color:white;
      font-size: 13px;
      margin-bottom: -15px;
      .lower-rate{
        position: absolute;
        top:28px;
        left:41px;
        .iconcheck {
          color: #62cd7b;
          top:-17px;
          left: 26px;
          position: absolute;
        }
      }
      .higher-limit{
        position: absolute;
        top:28px;
        left:141px;
        .iconcheck {
          color: #62cd7b;
          top:-17px;
          left: 26px;
          position: absolute;
        }
      }
      .faster-approval{
        position: absolute;
        top:28px;
        left:240px;
        .iconcheck {
          color: #62cd7b;
          top:-17px;
          left: 37px;
          position: absolute;
        }
      }
    }

    .instruction {
      padding: 0 16px 12px 16px;
      color: #2F3941;
      .instruction-title{
        text-align: center;
        font-size:20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #363F47;
      }
      .instruction-content-1,.instruction-content-2,.instruction-content-3{
        line-height: 22px;
        margin-bottom: 20px;
      }
      ul{
        list-style-type: disc;
        list-style-position: inside;
        li span {
          position: relative;
          left: -10px;
        }
      }
    }
    .loan-terms{
      background-color: #E9EBED;
      padding: 20px 16px 50px 16px;
      color: #68737D;
      .loan-terms-title{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-bottom:22px;
      }
      .loan-terms-content-1,.loan-terms-content-2,.loan-terms-content-3{
        font-size:14px;
      }
      .loan-terms-content-2,.loan-terms-content-3{
        margin-top: 8px;
      }
      .loan-terms-content-3{
        margin-bottom: 52px;
      }
      .bottom-btn {
        background-color: #FF8600;
        border-radius: 4px;
        width: 100%;
        height: 40px;
        font-size: 14px;
        margin-bottom: 16px;
      }
    }

    .loan-applied-wrapper {
      padding: 23px 16px 0 16px;
      color: #2F3941;
      .loan-heading {
        font-size:16px;
        font-weight: bold;
      }
      .loan-status {
        text-align:right;
        color: white;
        border-radius: 4px;
        padding: 5px 10px 5px 10px;
        font-size: 12px;
      }
      .green {
        background-color: #04A777;
      }

      .red {
        background-color: #B41800;
      }

      .gray {
        background-color: #A0B4C0;
      }

      .blue {
        background-color: #1F73B7;
      }
      .loan-details {
        border-bottom: 1px solid #D8D8D8;
        margin-top: 28px;
        padding-bottom: 20px;
        .label{
          color: #87929D;
          font-size:12px;
        }
        .info{
          text-align: right;
          font-size: 14px;
        }
      }
    }


  }
</style>
