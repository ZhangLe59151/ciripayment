<template>
  <div class="daily-fortune-question">
    <app-fortune-header :center="true" >
    </app-fortune-header>
    <div class="introduction">
      Answer these questions and we will predict today’s fortune for you.
    </div>
    <app-fortune-question-content v-on:submitAnswer="submitAnswer"  :index="index" :questionBody="question">
    </app-fortune-question-content>
  </div>
</template>

<script>
import AppFortuneQuestionContent from "../../components/fortune-telling/AppFortuneQuestionContent";
import AppFortuneHeader from "../../components/fortune-telling/AppFortuneHeader";
import { mapState } from "vuex";
export default {
  name: "DailyFortuneQuestion",
  components: { AppFortuneHeader, AppFortuneQuestionContent },
  data() {
    return {
      index: 1,
      questionList: require("@/assets/data/fortuneQuestionList.json"),
      question: "test"
    }
  },
  computed: {
    ...mapState({
      fortuneQuestionUsed: "fortuneQuestionUsed"
    })
  },
  mounted() {
    this.updateQuestion()
  },
  methods: {
    submitAnswer(answer) {
      if (this.index < 2) {
        this.index++;
        this.updateQuestion()
      } else {
        this.$router.push({ name: "DailyFortuneLoading" })
      }
    },
    updateQuestion() {
      let availableQuestionList = [];
      this.questionList.forEach((item) => {
        if (!this.fortuneQuestionUsed.includes(item.id)) {
          availableQuestionList.push(item)
        }
      });
      let randomIndex = Math.floor(Math.random() * availableQuestionList.length);
      let randomQuestion = this.questionList[randomIndex];
      this.question = randomQuestion.content;
      this.fortuneQuestionUsed.push(randomQuestion.id);
    }
  }
}
</script>

<style lang="scss" scoped>
  .daily-fortune-question {
    position: absolute;
    background-color: #FF8600;
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
