<template>
  <div class="daily-fortune-result">
    <fortune-telling-app-fortune-header />
    <div class="top-desc">
      <fortune-telling-app-fortune-master-photo
        class="master-photo"
        :masterId="fortuneInfo.selectedMaster.id"
        :imgSize="60"
      />
      <div class="master-des">
        {{$tc("FortuneTelling.masterDes", fortuneInfo.selectedMaster.name)}}
      </div>
    </div>

    <div
      class="web-get-fortune"
      v-if="$route.query.shareKey"
    >
      <img :src="require('@/assets/imgs/fortune-telling/finger.gif')">

      <div class="web-get-fortune-btn">{{$t("FortuneTelling.getFortuneBtn")}}</div>
    </div>

    <fortune-telling-app-fortune-result-content
      :fortuneInfo="fortuneInfo"
      :currency="currency"
    />

    <section
      class="action"
      v-if="!$route.query.shareKey"
    >
      <div
        class="like"
        @click="triggerLike"
      >
        <i :class="likeStatus ? 'iconfont iconlike' : 'iconfont iconunlike'" />
        <span class="like-text">{{likeStatus ? $t("FortuneTelling.liked") : $t("FortuneTelling.like")}}</span>
      </div>
      <div
        class="like"
        @click="triggerShare"
      >
        <i class="iconfont iconshare" />
        <span class="like-text">{{ $t("FortuneTelling.share") }}</span>
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
        <img
          :src="require('@/assets/imgs/fortune-telling/line_ico.png')"
          @click="shareOnAPP('line')"
        >
        <img
          :src="require('@/assets/imgs/fortune-telling/facebook_ico.png')"
          @click="shareOnAPP('facebook')"
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import i18n from '@/assets/lang/i18n';

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
      // const funcName = "shareOn".concat(this.deviceType);
      // this[funcName]();
    },
    shareOnAPP(platform) {
      const onSuccess = function(result) {
        this.$toast(i18n.t("FortuneTelling.shareSuccess"));
        console.log("Share completed!");
      };

      const onError = function(msg) {
        console.log("Sharing failed!" + msg);
        this.$toast(i18n.t("FortuneTelling.shareFailed"));
      };

      const shareMsg = "";
      const shareLink = "https://www.bbc.com/news";

      if (platform === "facebook") {
        window.plugins.socialsharing.shareViaFacebook(
          shareMsg,
          [""],
          shareLink,
          onSuccess,
          onError
        );
      } else if (platform === "line") {
        var options = {
          message: shareMsg,
          subject: "",
          files: [""],
          url: shareLink,
          chooserTitle: "",
          appPackageName: "jp.naver.line.android"
        };
        window.plugins.socialsharing.shareWithOptions(
          options,
          onSuccess,
          onError
        );
      }
    },
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
  overflow: hidden;

  .web-get-fortune {
    height: 40px;
    top: 40px;
    position: relative;
    margin: 10px 16px;
    img {
      height: 40px;
      position: absolute;
    }
    .web-get-fortune-btn {
      background: #ff8600;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 40px;
      height: 40px;
      width: 260px;
      position: absolute;
      right: 0;
    }
  }

  .top-desc {
    position: relative;
    width: 100%;
    height: 24px;
    color: white;
    font-size: 16px;
    text-align: center;
    .master-des {
      position: absolute;
      top: 20px;
      left: 95px;
    }
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

    .iconunlike,
    .iconshare {
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
