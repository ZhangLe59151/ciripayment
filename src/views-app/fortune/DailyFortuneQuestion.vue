<template>
  <div class="daily-fortune-question">
    <fortune-telling-app-fortune-header :title="title"
      :showLeftIcon="true" 
      :showRightIcon="true" /> />
    <div class="introduction">
      {{$t('Fortune.hang')}} {{fortuneInfo.selectedMaster.name}} {{ $t('Fortune.isCalc') }}}
    </div>
    <fortune-telling-app-fortune-question-content
      @submitAnswer="submitAnswer"
      :index="index"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyFortuneQuestion",
  data() {
    return {
      index: 1,
      questionList: require("@/assets/data/fortuneQuestionList.json"),
      question: "test",
      subtitle: "Write down the first one that comes to your mind."
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo",
      OTPVerified: "OTPVerified",
      fortuneInfo: "fortuneInfo"
    })
  },
  mounted() {
    if (!this.updateQuestion()) {
      this.$router.push({ name: "DailyFortuneLoading" });
    }
  },
  methods: {
    submitAnswer(answer) {
      if (this.index < 2) {
        this.index++;
        if (this.updateQuestion()) {
          return false;
        }
      }

      if (!this.OTPVerified) {
        this.$router.push({
          name: "LandingPage",
          query: { to: "DailyFortuneLoading" }
        });
        return false;
      }
      this.$router.push({ name: "DailyFortuneLoading" });
    },
    updateQuestion() {
      const availableQuestionList = [];
      this.questionList.forEach(item => {
        if (!this.fortuneInfo.fortuneQuestionUsed.includes(item.id)) {
          availableQuestionList.push(item);
        }
      });
      if (availableQuestionList.length === 0) {
        return false;
      }
      const randomIndex = Math.floor(
        Math.random() * availableQuestionList.length
      );
      const randomQuestion = availableQuestionList[randomIndex];

      this.question = randomQuestion.content;
      this.fortuneInfo.fortuneQuestionUsed.push(randomQuestion.id);
      return true;
    }
  }
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
