<template>
  <div class="daily-fortune-loading">
    <fortune-telling-app-fortune-header />
    <div class="text-box">
      <div class="top-title">
        {{ $t('Fortune.hang') }}
      </div>
      <div class="bottom-title">
        {{fortuneInfo.selectedMaster.name}} {{ $t('Fortune.isCalc') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyFortuneLoading",
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter",
      fortuneInfo: "fortuneInfo",
      isLogin: "OTPVerified",
      answerForm: "furtuneQuestion"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    }
  },
  mounted() {
    if (this.isLogin) {
      this.getFortunetellingByAPI();
      this.sendAnswer();
    } else {
      this.$router.push({ name: "LoginPage", query: { to: "Settings" } })
    }
  },
  methods: {
    getFortunetellingByAPI() {
      this.$api
        .getFortunetelling(this.fortuneInfo.selectedMaster.id)
        .then(res => {
          if (res.data.code === 200) {
            this.fortuneInfo.fortuneResult = res.data.data;
            this.$store.commit("SaveFortuneInfo", this.fortuneInfo);
            this.showResult();
          } else {
            this.$toast.fail(res.data.msg);
            this.$router.push({ name: "Home" });
          }
        });
    },
    sendAnswer() {
      this.$api.postAnswerF(this.answerForm).then(res => {
        if (res.data.code === 200) {
          this.$store.commit("ClearFortuneQuestion");
        }
      });
    },
    showResult() {
      setTimeout(() => {
        this.$router.push({ name: "DailyFortuneResult" });
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune-loading {
  position: relative;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;
  height: 100vh;
  width: 100%;
  text-align: center;
}
.text-box {
  position: absolute;
  top: 237px;
  left: 35px;
  right: 35px;
  height: 120px;
  .top-title {
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    font-size: 16px;
  }
  .bottom-title {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
    font-size: 20px;
    line-height: 32px;
    animation-name: test;
    animation-duration: 3s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
  }
  .bottom-title:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis steps(4, end) 2000ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0;
  }
  @keyframes ellipsis {
    to {
      width: 30px;
    }
  }
  @keyframes test {
    from { transform: translateY(0); }
    to { transform: translateY(-30px); }
  }
}
</style>
