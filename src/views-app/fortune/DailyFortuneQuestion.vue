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
      fortuneQuestionUsed: "fortuneQuestionUsed"
    })
  },
  mounted() {
    this.updateQuestion();
  },
  methods: {
    submitAnswer(answer) {
      if (this.index < 2) {
        this.index++;
        this.updateQuestion();
        return false;
      }
      this.$router.push({ name: "DailyFortuneLoading" });
    },
    updateQuestion() {
      const availableQuestionList = [];
      this.questionList.forEach(item => {
        if (!this.fortuneQuestionUsed.includes(item.id)) {
          availableQuestionList.push(item);
        }
      });
      const randomIndex = Math.floor(
        Math.random() * availableQuestionList.length
      );
      const randomQuestion = this.questionList[randomIndex];
      this.question = randomQuestion.content;
      this.fortuneQuestionUsed.push(randomQuestion.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune-question {
  position: absolute;
  background-color: #ff8600;
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
