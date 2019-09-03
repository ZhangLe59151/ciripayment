<template>
  <div
    class="app-fortune-question-content"
    id="appFortuneQuestionContent"
  >
    <div
      class="background-card"
      id="backgroundCard"
    >
      <div class="question-header">
        {{ $t("Fortune.question") }} {{ index }}
      </div>
      <div class="question-body">
        {{ questionList[questionIndex].question }}
      </div>
      <div class="question-subtitle">
        {{ questionList[questionIndex].description }}
      </div>
      <div class="bottom-actions">
        <van-field
          v-model="answer"
          class="answer-input"
          :border="true"
          :placeholder="questionList[questionIndex].placeholder"
          v-if="questionList[questionIndex].answerType === 2"
          :v-model="answer"
        />

        <div
          class="flex-container"
          v-if="questionList[questionIndex].answerType === 3 && questionList[questionIndex].options.length < 4"
        >
          <van-button
            v-for="(item,index) in questionList[questionIndex].options"
            :key="index"
            class="tab3"
            :class="{'tabSelected' : answer === item} "
            @click="onSelect(item)"
          >{{ item }}
          </van-button>
        </div>

        <div
          class="flex-container"
          v-if="questionList[questionIndex].answerType === 3 && questionList[questionIndex].options.length > 3"
        >

          <van-button
            v-for="(item,index) in questionList[questionIndex].options"
            :key="index"
            class="tab7"
            :class="{'tabSelected' :answer === item }"
            @click="onSelect(item)"
          >{{ item }}
          </van-button>

        </div>

      </div>
      <van-button
        class="bottom-btn"
        :disabled="answer.length === 0"
        @click="next"
      >
        {{index === 1 ? "Next" : "Get My Fortune"}}
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const today = new Date();
export default {
  name: "AppFortuneQuestionContent",

  data() {
    return {
      index: this.$route.params.id || 1,
      questionIndex: 0,
      answer: "",
      answerForm: [
        {
          id: 0,
          value: " ",
          answerDate: this.$moment(today).format("YYYYMMDD"),
          allowRepeat: 0
        },
        {
          id: 0,
          value: " ",
          answerDate: this.$moment(today).format("YYYYMMDD"),
          allowRepeat: 0
        }
      ],
      questionList: [{ question: "" }]
    };
  },
  computed: {
    ...mapState({
      isLogin: "OTPVerified",
      furtuneQuestion: "furtuneQuestion"
    })
  },

  created() {
    window.addEventListener("native.keyboardshow", keyboardShowHandler);
    function keyboardShowHandler(e) {
      document.getElementById(
        "appFortuneQuestionContent"
      ).style.height = `${window.innerHeight * 0.75 + e.keyboardHeight}px`;
      document.getElementById(
        "backgroundCard"
      ).style.height = `${window.innerHeight * 0.75 + e.keyboardHeight}px`;
    }
    // This event fires when the keyboard will hide
    window.addEventListener("native.keyboardhide", keyboardHideHandler);
    function keyboardHideHandler(e) {
      document.getElementById(
        "appFortuneQuestionContent"
      ).style.height = `${window.innerHeight * 0.75}px`;
      document.getElementById(
        "backgroundCard"
      ).style.height = `${window.innerHeight * 0.75}px`;
    }
    this.$api.getQuestionF().then(res => {
      if (res.data.code === 200) {
        this.questionList = res.data.data.questions;
        this.answerForm[0].allowRepeat = res.data.data.questions[0].allowRepeat;
        this.answerForm[1].allowRepeat = res.data.data.questions[1].allowRepeat;
        this.answerForm[0].id = res.data.data.questions[0].id;
        this.answerForm[1].id = res.data.data.questions[1].id;
      }
    });
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, oldVal) {
        this.index = +val.params.id;
        this.questionIndex = this.index - 1;
        this.answer = this.answerForm[this.questionIndex].value;
      }
    }
  },
  methods: {
    next() {
      this.answerForm[this.questionIndex].value = this.answer;
      this.$store.commit("UpdateFurtuneQuestionInfo", this.answerForm);

      this.answer = "";

      if (this.index === 1) {
        // index === 2
        this.$router.push({ name: "DailyFortuneQuestion", params: { id: 2 } });
        this.questionIndex += 1;
      } else if (this.index === 2 && this.isLogin) {
        this.$api.postAnswerF(this.furtuneQuestion).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: "DailyFortuneLoading" });
          }
        });
      } else if (this.index === 2 && !this.isLogin) {
        this.$router.push({
          name: "LoginPage",
          query: { to: "DailyFortuneLoading" }
        });
      }

      this.index === 1 ? 2 : 1;
    },
    onSelect(item) {
      this.answer = item;
    }
  }
};
</script>

<style lang="scss" scoped>
//@import "../assets/css/bottom-btn.scss";
.app-fortune-question-content {
  position: relative;
  height: 75vh;
  width: calc(100vw - 22px);
  margin-left: 11px;
  margin-right: 11px;
  min-height: 470px;
}
.background-card {
  position: relative;
  background: url("../../assets/imgs/fortune-telling/fortune_telling_question_card.png")
    no-repeat center;
  background-size: cover;
  width: calc(100vw - 22px);
  height: 100%;
  min-height: 470px;

  .question-header {
    font-size: 14px;
    padding-top: 30px;
    width: calc(100vw - 22px);
    height: 16px;
    text-align: center;
  }

  .question-body {
    padding-top: 12px;
    font-weight: bolder;
    color: #2f3941;
    font-size: 20px;
    min-height: 24px;
    max-height: 72px;
    width: calc(100vw - 64px);
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .question-subtitle {
    padding-top: 10px;
    color: #68737d;
    font-size: 14px;
    min-height: 24px;
    max-height: 54px;
    width: calc(100vw - 64px);
    text-align: center;
    margin: 0 20px 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .bottom-btn {
    background-color: #ffa702;
    color: #ffffff;
    font-size: 14px;
    height: 40px;
    width: calc(100vw - 92px);
    position: absolute;
    bottom: 40px;
    left: 38px;
  }

  .bottom-actions {
    position: relative;
    left: 37px;
    right: 37px;
    height: 140px;
    width: calc(100% - 70px);

    .answer-input {
      position: absolute;
      background-color: #ffffff;
      font-size: 24px;
      text-align: center;
      line-height: 80px;
      top: 34px;
      height: 80px;
      width: calc(100vw - 95px);
      border-radius: 4px;
      border: 1px solid #87929d;
      box-sizing: border-box;
    }

    .flex-container {
      display: flex;
      flex-wrap: wrap;
      .tab3 {
        width: 100%;
        height: 40px;
        border: 1px solid #87929d;
        border-radius: 4px;
        background-color: transparent;
        margin-top: 10px;
        line-height: normal;
        &.tabSelected {
          background-color: #2f3941;
          color: #ffffff;
        }
      }

      .tab7 {
        width: calc(50% - 8px);
        height: 40px;
        top: 30px;
        margin: 0 4px 5px 4px;
        border: 1px solid #87929d;
        border-radius: 4px;
        background-color: transparent;
        line-height: normal;
        &.tabSelected {
          background-color: #2f3941;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
