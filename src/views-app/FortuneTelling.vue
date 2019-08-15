<template>
  <div class="fortuneTelling">
    <div class="backgroundImgNormal" v-on:click="status=1" v-show="status === 0"></div>
    <div class="backgroundImgOpening" v-on:click="status=2" v-show="status === 1"></div>
    <transition name="bounce">
      <div class="result" v-show="status === 2"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "FortuneTelling",
  data() {
    return {
      // 0: normal, 1: opening, 2: result
      status: 0
    }
  }
}
</script>

<style scoped>
  .fortuneTelling {
    background-color: #e39502;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .backgroundImgNormal {
    background: url("../assets/imgs/fortune-telling/fortune_telling_normal.gif");
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .backgroundImgOpening {
    background: url("../assets/imgs/fortune-telling/fortune_telling_opening.gif");
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .result {
    background-color: #e31122;
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
