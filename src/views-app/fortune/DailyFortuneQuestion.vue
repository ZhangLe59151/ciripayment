<template>
  <div class="daily-fortune-question">
    <fortune-telling-app-fortune-header :center="true" />
    <div class="introduction">
      Answer these questions and we will predict today’s fortune for you.
    </div>
    <fortune-telling-app-fortune-question-content
      @submitAnswer="submitAnswer"
      :index="index"
      :questionBody="question"
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
      question: "test"
    };
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo",
      OTPVerified: "OTPVerified"
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
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune-question {
  position: relative;
  background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;
  height: 100vh;
  width: 100%;
}
.introduction {
  font-size: 16px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
</style>
