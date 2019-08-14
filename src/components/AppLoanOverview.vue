<template>
 <div class="app-loan-overview">
   <div class="banner">
     <div class="banner-title">
       Maximum Loan Amount
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
      <div>Lower Rate</div>
    </div>
     <div class="higher-limit">
       <i
         class="iconfont iconcheck"
       />
       <div>Higher Limit</div>
     </div>
     <div class="faster-approval">
       <i
         class="iconfont iconcheck"
       />
       <div>Faster Approval</div>
     </div>
   </div>
   <div class="instruction">
    <div class="instruction-title">
      Maximise Your Limit
    </div>
     <div class="instruction-content-1">
       Enjoy a higher limit and faster approval time when you provide your profile information:
     </div>
     <ul class="instruction-content-2">
       <li><span>Personal Details</span></li>
       <li><span>Business Information</span></li>
       <li><span>Photos of Your ID</span></li>
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
</template>

<script>

export default {
  name: "AppLoanOverview",
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    handleStart() {

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
        top:25px;
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
        top:25px;
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
        top:25px;
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
        margin-bottom:12px;
      }
      .loan-terms-content-1,.loan-terms-content-2,.loan-terms-content-3{
        font-size:14px;
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

  }
</style>
