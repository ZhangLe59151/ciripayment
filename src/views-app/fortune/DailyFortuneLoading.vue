<template>
  <div class="daily-fortune-loading">
    <app-fortune-header></app-fortune-header>
    <div class="text-box">
      <div class="top-title">
        Hang in there!
      </div>
      <div class="bottom-title">
        Master Tang is calculating your fortune
      </div>
    </div>
  </div>
</template>

<script>
import AppFortuneHeader from "../../components/fortune-telling/AppFortuneHeader";
import { mapState } from "vuex";
export default {
  name: "DailyFortuneLoading",
  components: { AppFortuneHeader },
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    }
  },
  mounted() {
    this.getFortunetellingByAPI()
  },
  methods: {
    getFortunetellingByAPI() {
      this.$api.getFortunetelling().then(res => {
        if (res.data.code === 200) {
          let fortunetellingFrame = res.data.data;
          this.$store.commit("SaveFortunetellingResult", {
            [this.today]: fortunetellingFrame
          });
          this.showResult();
        } else {
          this.$toast.fail(res.data.msg);
          this.$router.push({ name: "Home" });
        }
      });
    },
    showResult() {
      setTimeout(() => {
        this.$router.push({ name: "DailyFortuneResult" })
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
  .daily-fortune-loading {
    position: relative;
    background-color: #FF8600;
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
    }
    .bottom-title:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4,end) 2000ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0;
    }
    @keyframes ellipsis {
      to {
        width: 30px;
      }
    }
  }
</style>
