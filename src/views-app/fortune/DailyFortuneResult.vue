<template>
  <div class="daily-fortune-result">
    <fortune-telling-app-fortune-header />
    <div class="top-desc">
      Here's your fortune by {{fortuneInfo.selectedMaster.name}}!
    </div>
    <fortune-telling-app-fortune-result-content
      :fortuneInfo="fortuneInfo"
      :currency="currency"
    />

    <section class="action">
      <div
        class="like"
        @click="triggerLike"
      >
        <i :class="likeStatus ? 'iconfont iconlike' : 'iconfont iconunlike'" />
        <span class="like-text">Like</span>
      </div>
      <div
        class="like"
        @click="triggerShare"
      >
        <i :class="likeStatus ? 'iconfont iconlike' : 'iconfont iconunlike'" />
        <span class="like-text">Share</span>
      </div>
    </section>

    <van-popup
      v-model="showPopUp"
      round
      :overlay="false"
      position="bottom"
      get-container="daily-fortune-result"
      class="popup"
    >
      <div class="share-text">{{$t("FortuneTelling.shareCopy")}} </div>
      <div>
        <img :src="require('@/assets/imgs/fortune-telling/line_ico.png')">
        <img :src="require('@/assets/imgs/fortune-telling/facebook_ico.png')">
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyFortuneResult",
  data() {
    return {
      showPopUp: false,
      fortuneResult: "",
      salesResult: "",
      likeStatus: false,
      processingLike: false
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo",
      localDateFormatter: "localDateFormatter",
      currency: "currency",
      deviceType: "deviceType"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    }
  },
  mounted() {
    let savedResult = this.fortuneInfo.fortuneResult;
    this.fortuneResult = savedResult.fortuneResult;
    this.likeStatus = savedResult.like;
  },
  destroyed() {
    this.updateLikeStatusWithApi();
  },
  methods: {
    triggerShare() {
      this.showPopUp = true;
      const funcName = "shareOn".concat(this.deviceType);
      this[funcName]();
    },
    shareOnAPP() {},
    shareOnWEB() {},
    triggerLike() {
      this.likeStatus = !this.likeStatus;
      if (!this.processingLike) {
        this.updateLikeStatusWithApi();
      }
    },
    updateLikeStatusWithApi() {
      const resultId = this.fortuneInfo.fortuneResult.id;
      const api = this.likeStatus
        ? this.$api.likeFortunetellingResult
        : this.$api.unlikeFortunetellingResult;
      this.processingLike = true;
      api(resultId)
        .then(() => {
          this.processingLike = false;
        })
        .catch(() => {
          this.processingLike = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune-result {
  position: relative;
  height: 100vh;
  width: 100%;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;
  .top-desc {
    position: absolute;
    width: 100%;
    height: 24px;
    color: white;
    font-size: 16px;
    text-align: center;
  }
  .app-fortune-result-content {
    margin-top: 20px;
  }

  .action {
    display: flex;
    flex: 1 1;
    margin: 0 66px;
    justify-content: space-between;
  }

  .share {
    color: white;
    margin-top: 40px;
    text-align: right;
    margin-right: 20px;
    font-size: 40px;
  }

  .like {
    color: white;
    margin-top: 70px;
    text-align: left;
    margin-right: 20px;

    .iconunlike {
      color: white;
      font-size: 30px;
    }
    .iconlike {
      color: #d44832;
      font-size: 30px;
    }
    .like-text {
      color: white;
      font-size: 16px;
      margin-left: 8px;
    }
  }

  .popup {
    height: 130px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .share-text {
      font-size: 16px;
      color: #2f3941;
      letter-spacing: 0;
      margin: 20px 20px 10px 20px;
    }

    img {
      height: 40px;
      width: 40px;
      margin: 10px 0 0 20px;
    }
  }
}
</style>
