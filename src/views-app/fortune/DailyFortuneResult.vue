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
    <div class="like"
         @click="triggerLike">
      <i :class="likeStatus ? 'iconfont iconlike' : 'iconfont iconunlike'" />
      <span class="like-text">Like</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyFortuneResult",
  data() {
    return {
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
      currency: "currency"
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
    this.updateLikeStatusWithApi()
  },
  methods: {
    triggerLike() {
      this.likeStatus = !this.likeStatus;
      if (!this.processingLike) {
        this.updateLikeStatusWithApi()
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
  background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
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
  .like {
    color: white;
    margin-top: 70px;
    text-align: right;
    margin-right: 20px;
    .iconunlike {
      color: white;
    }
    .iconlike {
      color: #D44832;
    }
    .like-text {
      color: white;
      font-size: 16px;
      margin-left: 8px;
    }
  }
}
</style>
