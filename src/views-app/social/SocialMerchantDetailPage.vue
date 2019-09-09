<template>
  <div class="socialMerchantDetailPage">
    <app-common-header :title="$t('Social.merchantTitle')" />
    <img class="mainImg" />
    <van-row>
      <img class="imgBox" />
      <img class="imgBox" />
      <img class="imgBox" />
    </van-row>
    <div class="title">Little Thais Co.</div>
    <div class="descriptText"><span class="iconfont iconretail" />Retail Business</div>
    <div class="descriptText"><span class="iconfont iconretail" />128 Likes</div>
    <van-button class="joinBtn">Send A Like</van-button>
    <van-button class="reportBtn" @click="showDialog">Report</van-button>
    <div class="alert" v-if="show">
      <div class="alertTitle">Why are you reporting this merchant?</div>
      <van-button class="alertbtn">Content is violent.</van-button>
      <van-button class="alertbtn">Content is inappropriate.</van-button>
      <van-button class="alertbtn">Content is spam.</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "socialMerchantDetailPage",
  data() {
    return {
      showDetail: false,
      show: false
    }
  }, 
  methods: {
    showDialog() {
      this.show = true
    },
    getUserInfo(event) {
      console.log(event.detail);
    },
    onClose() {
      this.setData({ close: false });
    }
  }
  
};
</script>

<style lang="scss" scoped>
.socialMerchantDetailPage {
  height: 100vh;
  width: 100%;
  background-color: white;

  .mainImg {
    height: 250px;
    width: 100%;
    background-color: #A0B4C0;
  }

  .imgBox {
    margin: 0 0 0 16px;
    height: 80px;
    width: 80px;
    background-color: #87929D;
    border-radius: 4px;
  }

  .title {
    margin: 20px 16px 0 16px;
    width: 328px;
    min-height: 32px;
    font-size: 24px;
    font-weight: bold;
  }

  .descriptText {
    color: black;
    font-size: 14px;
    min-height: 20px;
    margin: 20px 0 0 16px;
  }

  .joinBtn {
    margin: 32px 16px 0 16px;
    width: 328px; //calc(100%-32px);
    font-size: 14px;
    background-color: #ffa702;
    color: #052d46;
  }

}

.reportBtn {
  position: fixed;
  top: 60px;
  right: 16px;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}

.alert {
  position: fixed;
  height: 324px;
  width: 328px;
  left: 16px;
  top: 134px;
  background-color: white;

  .alertTitle {
    position: fixed;
    max-height: 221px;
    min-width: 56px;
    font-size: 20px;
    font-weight: bolder;
  }

  .alertBtn {
    position: absolute;
    margin: 16px 16px 16px 16px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 4px;
    text-align: center;
    width: 296px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
