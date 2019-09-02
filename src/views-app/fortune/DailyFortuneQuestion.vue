<template>
  <div class="daily-fortune-question">
    <fortune-telling-app-fortune-header
      :showTitle="$t('Fortune.dailyTitle')"
      :showLeftIcon="true"
      :showRightIcon="true"
    />
    <div
      class="introduction"
      v-show="index === 1"
    >
      {{$tc("FortuneTelling.question1", fortuneInfo.selectedMaster.name)}}
    </div>

    <div
      class="introduction"
      v-show="index === 2"
    >
      {{$t("FortuneTelling.question2")}}
    </div>

    <fortune-telling-app-fortune-question-content />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DailyFortuneQuestion",
  data() {
    return {
      index: 1,
      questionList: require("@/assets/data/fortuneQuestionList.json")
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.daily-fortune-question {
  position: relative;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;
  min-height: 170vh;
  width: 100vw;
}
.introduction {
  font-size: 16px;
  color: white;
  text-align: center;
  margin: 10px 16px 20px 16px;
}
</style>
