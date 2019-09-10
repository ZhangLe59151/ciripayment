<template>
  <div class="socialMerchantDetailPage">
    <div class="alertPage" v-if="show"></div>
    <div class="alertBox" v-if="show">
      <van-icon class="iconfont iconclose" @click="show = false"/>
      <div class="alertTitle">Why are you reporting this merchant? </div>
      <van-button :class="isFirst ? 'alertBtnSelect' : 'alertBtn'" @click="selectFirst">Content is violent.</van-button>
      <van-button :class="isSecond ? 'alertBtnSelect' : 'alertBtn'" @click="selectSecond">Content is inappropriate.</van-button>
      <van-button :class="isThird ? 'alertBtnSelect' : 'alertBtn'" @click="selectThird">Content is spam.</van-button>
      <van-button class="submitBtn">Report</van-button>
    </div>

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
    <van-button class="reportBtn" @click="show = true">Report</van-button>
  </div>
</template>

<script>
export default {
  name: "socialMerchantDetailPage",
  data() {
    return {
      showDetail: false,
      show: false,
      isReport: false,
      isFirst: false,
      isSecond: false,
      isThird: false
    }
  }, 
  watch: {

  },
  methods: {
    getUserInfo(event) {
      console.log(event.detail);
    },
    selectFirst() {
      this.isFirst = (!this.isFirst);
    },
    selectSecond() {
      this.isSecond = (!this.isSecond);
    },
    selectThird() {
      this.isThird = (!this.isThird);
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

.alertPage {
  height: 100vh;
  width: 100%;
  background-color: #4C4C4C;
  position: fixed;
  z-index: 2;
  opacity: 0.8;  
}

.alertBox {
  position: fixed;
  height: 324px;
  width: 328px;
  margin: 100px 16px 100px 16px;
  background-color: white;
  z-index: 3;
  border-radius: 4px;

  .alertTitle {
    margin: 16px 16px 0 16px;
    font-size: 20px;
    font-weight: bolder;
    max-width: 221px;
  }

  .iconfont {
    position: absolute;
    right: 16px;
    top: 26px;
    font-size: 25px;
  }

  .alertBtn {
    margin: 16px 16px 0 16px;
    width: 296px;
    border: 1px solid black;
    text-align: left;
  }

  .alertBtnSelect {
    margin: 16px 16px 0 16px;
    width: 296px;
    border: 1px solid #2F3941;
    text-align: left;
    background-color: #2F3941;
    color: white;
  }

  .submitBtn {
    margin: 16px 16px 0 16px;
    width: 296px;
    border: 1px solid #E9EBED;
    background-color: #E9EBED;
    text-align: center;
  }

}

</style>
