<template>
  <div class="app-fortune-question-content">
    <div class="background-card">
      <div class="question-header">
        Question {{index}}
      </div>
      <div class="question-body">
        {{questionBody}}
      </div>
      <div class="bottom-actions">
        <van-field
          v-model="answer"
          class="answer-input"
          :border="true"
          v-if="type === '1'"
        />

        <div v-if="type === '2'">

        </div>

        <van-button
          class="bottom-btn"
          type="primary"
          :disabled="answer.length === 0"
          @click="next"
        >
          {{index === 1 ? "Next" : "Get My Fortune"}}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFortuneQuestionContent",
  props: {
    index: {
      default: 1,
      type: Number
    },
    questionBody: {
      default: "",
      type: String
    },
    type: {
      default: "1"
    }
  },
  data() {
    return {
      answer: ""
    };
  },
  methods: {
    next() {
      this.$emit("submitAnswer", this.answer);
      this.answer = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-question-content {
  position: relative;
  height: 65vh;
  width: 90%;
  margin-left: 20px;
  margin-right: 20px;
}
.background-card {
  position: absolute;
  background: url("../../assets/imgs/fortune-telling/fortune_telling_question_card.png")
    no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.question-header {
  position: absolute;
  font-size: 14px;
  top: 48px;
  width: 100%;
  height: 16px;
  text-align: center;
}
.question-body {
  position: absolute;
  color: black;
  font-size: 20px;
  top: 104px;
  height: 24px;
  width: 90%;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
.bottom-actions {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 212px;
  bottom: 0;
  height: 205px;
  .answer-input {
    position: absolute;
    background-color: transparent;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #68737d;
    box-sizing: border-box;
  }
  .bottom-btn {
    position: absolute;
    background-color: #ff8600;
    color: white;
    font-size: 14px;
    height: 40px;
    width: 100%;
    bottom: 48px;
  }
}
</style>
