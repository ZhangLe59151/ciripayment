<template>
  <div class="fortune-telling">
    <div
      class="background-img-normal"
      v-on:click="startOpeningProcess"
      v-if="status===statusEnum.normal"
    >
      <div class="tap-tips">{{$t("FortuneTelling.TapChestTips")}}</div>
    </div>
    <div class="background-img-opening" v-if="status===statusEnum.opening"></div>
    <transition name="bounce">
      <div class="result-page" v-if="status===statusEnum.finish">
        <fortunetelling-result/>
      </div>
    </transition>
    <audio :src="require('@/assets/audio/fortune-telling-shake.mp3')" id="fortune-telling-shake"></audio>
    <audio :src="require('@/assets/audio/fortune-telling-success.mp3')" id="fortune-telling-finish"></audio>
  </div>
</template>

<script>
import FortunetellingResult from "./FortunetellingResult";
import { mapState } from "vuex";
export default {
  name: "FortuneTelling",
  components: {
    FortunetellingResult
  },
  data() {
    return {
      status: 0,
      minOpeningAnimateDuration: 3000,
      animateStartTime: 0
    };
  },
  computed: {
    ...mapState({
      fortunetellingFrame: state => state.fortunetellingFrame,
      recordList: state => state.recordList
    }),
    statusEnum() {
      return {
        normal: 0,
        opening: 1,
        finish: 2
      };
    },
    today() {
      return this.$moment().format("YYYYMMDD");
    },
    shakeAudio() {
      return document.getElementById("fortune-telling-shake");
    },
    finishAudio() {
      return document.getElementById("fortune-telling-finish");
    }
  },
  methods: {
    startOpeningProcess() {
      this.status = this.statusEnum.opening;
      this.animateStartTime = new Date().getTime();
      this.getFortunetelling();
      this.shakeAudio.loop = true;
      this.shakeAudio.play();
    },
    showResult() {
      let networkDuration = new Date().getTime() - this.animateStartTime;
      let timeout = 0;
      if (networkDuration < this.minOpeningAnimateDuration) {
        timeout = this.minOpeningAnimateDuration - timeout;
      }
      setTimeout(() => {
        this.status = this.statusEnum.finish;
        this.shakeAudio.pause();
        this.finishAudio.play();
      }, timeout);
    },
    getFortunetelling() {
      this.getFortunetellingByAPI();
    },
    getFortunetellingByAPI() {
      this.$api.getFortunetelling().then(res => {
        if (res.data.code === 200) {
          let fortunetellingFrame = res.data.data;
          fortunetellingFrame["luckyDescription"] =
            res.data.data.luckyWords[0]["value"];
          fortunetellingFrame["luckyWords"] =
            res.data.data.luckyWords[0]["key"];
          this.$store.commit("SaveFortunetellingResult", {
            [this.today]: fortunetellingFrame
          });
          this.showResult();
        } else {
          this.status = this.statusEnum.normal;
          this.shakeAudio.pause();
        }
      });
    }
  },
  mounted() {
    if (this.fortunetellingFrame[this.today]) {
      this.status = this.statusEnum.finish;
    }
  }
};
</script>

<style scoped>
.fortune-telling {
  background-color: #e39502;
  position: fixed;
  width: 100%;
  height: 100%;
}
.background-img-normal {
  background: url("../assets/imgs/fortune-telling/fortune_telling_normal.gif");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.tap-tips {
  text-align: center;
  margin-top: 20vh;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.background-img-opening {
  background: url("../assets/imgs/fortune-telling/fortune_telling_opening.gif");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.result-page {
  position: fixed;
  width: 100%;
  height: 100%;
}
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
