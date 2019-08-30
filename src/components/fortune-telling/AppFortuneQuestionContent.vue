<template>
  <div class="app-fortune-question-content">
    <div class="background-card">
      <div class="question-header">
        {{ $t("Furtune.question") }} {{ index }}
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

        <div class="flex-container" v-if="questionList[questionIndex].answerType === 3 && questionList[questionIndex].options.length < 4">
          <div v-for="(item,index) in questionList[questionIndex].options" :key="index">
             <van-button
              :class="(answer === item ? 'tab3Selected' : 'tab3')"
              @click="onSelect(item)" >{{ item }}
            </van-button>
          </div>
        </div>

        <div
          class="flex-container"
           v-if="questionList[questionIndex].answerType === 3 && questionList[questionIndex].options.length > 3">
           <div v-for="(item,index) in questionList[questionIndex].options" :key="index">
            <van-button
              :class="(answer === item ? 'tab7Selected' : 'tab7')"
              @click="onSelect(item)" >{{ item }}
            </van-button>
          </div>
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
      index: 1,
      questionIndex: 0,
      answer: "",
      answerForm: [
        { id: 0, value: " ", answerDate: this.$moment(today).format("YYYYMMDD"), allowRepeat: 0 },
        { id: 0, value: " ", answerDate: this.$moment(today).format("YYYYMMDD"), allowRepeat: 0 } ],
      questionList: [
        { "question": "" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLogin: "OTPVerified"
    })
  },
  created() {
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
  methods: {
    next() {
      this.answerForm[this.questionIndex].value = this.answer;
      this.answer = "";
      this.index += 1;     
      if (this.index === 3) {
        if (this.isLogin) {
          this.$api.postAnswerF(this.answerForm).then(res => {
            if (res.data.code === 200) {
              setTimeout(() => { this.$router.push({ name: "DailyFortuneLoading" }); }, 1500);
            }
          });
        } else {
          this.$store.commit("UpdateFurtuneQuestionInfo", this.answerForm);
          this.$router.push({ name: "LoginPage", query: { to: "DailyFortuneLoading" } });
        }
      } else {
        this.questionIndex += 1;
      }
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
  width: 337px;
  margin-left: 11px;
  margin-right: 11px;
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
  font-weight: bolder;
  color: black;
  font-size: 20px;
  top: 84px;
  height: 24px;
  width: 90%;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
.question-subtitle {
  position: absolute;
  color: #68737D;
  font-size: 14px;
  top: 164px;
  height: 24px;
  width: 90%;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}

.bottom-actions {
  position: relative;
  left: 37px;
  right: 37px;
  top: 180px;
  bottom: 0;
  height: 140px;
  width: 264px;

  .answer-input {
    position: absolute;
    background-color: white;
    font-size: 24px;
    text-align: center;
    line-height: 80px;
    top: 34px;
    height: 80px;
    width: 264px;
    border-radius: 4px;
    border: 1px solid #87929D;
    box-sizing: border-box;
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;

    .tab3 {
      width: 264px;
      height: 40px;
      margin: 0 0 10px 0;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: transparent;
    }

    .tab3Selected {
      width: 264px;
      height: 40px;
      margin: 0 0 10px 0;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: #2F3941;
      color: white;
    }

    .tab7 {
      width: 124px;
      height: 40px;
      top: 30px;
      margin: 0 4px 5px 4px;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: transparent;
    }

    .tab7Selected {
      width: 124px;
      height: 40px;
      top: 30px;
      margin: 0 4px 5px 4px;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: #2F3941;
      color: white;
    }
  }

}

.bottom-btn {
  position: absolute;
  background-color: #ff8600;
  color: white;
  font-size: 14px;
  left: 32px;
  height: 40px;
  width: 264px;
  bottom: 50px;
}
</style>
