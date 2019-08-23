<template>
  <div class="daily-fortune">
    <fortune-telling-app-fortune-header />
    <div class="top-desc">
      Select a Master to tell your fortune.
    </div>
    <div class="master-select">
      <fortune-telling-app-fortune-master
        v-for="(master,index) in masterList"
        class="fortune-master-item"
        :master="master"
        @chooseMaster="chooseMaster"
        :key="index"
      />
    </div>
    <div class="powered-tips">
      This service is powered by Master Cai, Master Yun and Master Fu
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DailyFortunePrepare",
  data() {
    return {
      masterList: require("@/assets/data/fortuneMasterList.json")
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {
    chooseMaster(master) {
      this.fortuneInfo.selectedMaster = master;
      this.$store.commit("SaveFortuneInfo", this.fortuneInfo);
      this.$router.push({ name: "DailyFortuneQuestion" });
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune {
  position: relative;
  height: 100vh;
  width: 100%;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;

  .top-desc {
    width: 100%;
    font-size: 16px;
    color: white;
    text-align: center;
  }

  .master-select {
    width: 100%;
    height: 450px;
    margin-top: 40px;

    .fortune-master-item {
      margin-bottom: 24px;
    }
  }

  .powered-tips {
    position: absolute;
    color: white;
    font-size: 10px;
    text-align: center;
    bottom: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: 10px;
    opacity: 0.7;
  }
}
</style>
