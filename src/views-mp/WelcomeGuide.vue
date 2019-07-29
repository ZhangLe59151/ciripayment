<template>
  <div class="welcome-guide">
    <van-nav-bar
        title
        right-text="Skip"
        @click-right="handleNextPage()"
        :border="false"
        style="background-color: #ffffff">
    </van-nav-bar>
    <van-swipe class="swipe" ref="swipeCard" @change="updatePageData" indicator-color="#000000">
      <van-swipe-item v-for="(item, index) in items" :key="index" >
        <div class="title">
          {{item.title}}
        </div>
        <img :src="getImgUrl(item.image)"/>
        <div class="description">
          {{item.description}}
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-button
        size="large"
        class="bottom-btn-boxed"
        @click="handleNext"
        style="margin-bottom:100px; width: 100px;"
        v-if="page !== 2"
    >
      Next
    </van-button>
    <van-button
        size="large"
        class="bottom-btn-boxed"
        @click="handleNextPage"
        style="margin-bottom:100px; width: 100px;"
        v-else
    >
      Finish
    </van-button>
  </div>
</template>

<script>
export default {
  name: "WelcomeGuide.vue",
  data() {
    return {
      page: 0,
      items: [
        {
          title: "Welcome to Your Merchant Portal",
          description: "Manage your services and more on this onestop business platform",
          image: "welcome_1.png"
        },
        {
          title: "Take Your Business Further",
          description: "Explore and apply for new services with the Merchant Portal",
          image: "welcome_2.png"
        },
        {
          title: "Receive Payment Instantly via QR Code",
          description: "Simply present your QR code for your customer to scan, then key in the amount",
          image: "artboard.png"
        }
      ]
    }
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/imgs/" + pic)
    },
    handleNextPage() {
      this.$router.push({ name: "ServiceOverview" });
    },
    handleNext() {
      this.$refs.swipeCard.swipeTo(this.page + 1);
    },
    updatePageData(index) {
      this.page = index;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.welcome-guide {
  text-align: center;
  .van-nav-bar {
      background-color: #f2f2f2;
    }
  .title {
      font-size: 24px;
      margin: 0 10% 10px;
      text-align: center;
      font-weight: bold;
    }
  .description {
    font-size: 16px;
    line-height: 24px;
    position: absolute;
    width: 80%;
    margin-left: 10%;
    bottom: 30px;
  }
  .swipe {
    height: 450px;
    margin: 30px 0;
    img {
      margin: 5% 0;
      width: 250px;
      max-height: 250px;
      poition: relative;
    }
  }

}
</style>

<style lang="scss">
.van-swipe__indicator {
  width: 8px;
  height: 8px;
}
</style>
