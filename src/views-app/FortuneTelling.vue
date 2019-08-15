<template>
  <div class="fortune-telling">
    <div class="background-img-normal" v-on:click="startOpeningProcess()" v-if="status===statusEnum.normal">
      <div class="tap-tips">
        Tap on the treasure chest!
      </div>
    </div>
    <div class="background-img-opening" v-if="status===statusEnum.opening">
    </div>
    <transition name="bounce">
      <div class="result-page" v-if="status===statusEnum.finish">
        <fortunetelling-result/>
      </div>
    </transition>
  </div>
</template>

<script>
import FortunetellingResult from "./FortunetellingResult";
export default {
  name: "FortuneTelling",
  components: {
    FortunetellingResult
  },
  data() {
    return {
      status: 0,
      minOpeningAnimateDuration: 3000
    }
  },
  computed: {
    statusEnum() {
      return {
        normal: 0,
        opening: 1,
        finish: 2
      }
    }
  },
  methods: {
    startOpeningProcess() {
      this.status = this.statusEnum.opening;
      let startTime = new Date().getTime();
      // update network duration after request api
      let networkDuration = new Date().getTime() - startTime;
      let timeout = 0;
      if (networkDuration < this.minOpeningAnimateDuration) {
        timeout = this.minOpeningAnimateDuration - timeout
      }
      setTimeout(() => {
        this.status = this.statusEnum.finish;
      }, timeout)
    }
  }
}
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
    animation: bounce-in .2s;
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
