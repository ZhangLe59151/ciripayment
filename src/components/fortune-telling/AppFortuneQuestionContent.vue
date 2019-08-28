<template>
  <div class="app-fortune-question-content">
    <div class="background-card">
      <div class="question-header">
        Question {{index}}
      </div>
      <div class="question-body">
        {{questionBody}}
      </div>
      <div class="question-subtitle">
        {{questionSubtitle}}
      </div>
      <div class="bottom-actions">
        <van-field
          v-model="answer"
          class="answer-input"
          :border="true"
          placeholder="E.g. Orange Juice"
          v-if="type === '1'"
        />

        <div class="flex-container" v-if="type === '2'">
          <van-button :class="(answer === 1 ? 'tab3Selected' : 'tab3')" @click="onSelect(1)" >1</van-button>
          <van-button :class="(answer === 2 ? 'tab3Selected' : 'tab3')" @click="onSelect(2)" >1</van-button>
          <van-button :class="(answer === 3 ? 'tab3Selected' : 'tab3')" @click="onSelect(3)" >1</van-button>
        </div>

        <div class="flex-container" v-if="type === '3'">
          <van-button :class="(answer === 1 ? 'tab7Selected' : 'tab7')" @click="onSelect(1)" >1</van-button>
          <van-button :class="(answer === 2 ? 'tab7Selected' : 'tab7')" @click="onSelect(2)" >1</van-button>
          <van-button :class="(answer === 3 ? 'tab7Selected' : 'tab7')" @click="onSelect(3)" >1</van-button>
          <van-button :class="(answer === 4 ? 'tab7Selected' : 'tab7')" @click="onSelect(4)" >1</van-button>
          <van-button :class="(answer === 5 ? 'tab7Selected' : 'tab7')" @click="onSelect(5)" >1</van-button>
          <van-button :class="(answer === 6 ? 'tab7Selected' : 'tab7')" @click="onSelect(6)" >1</van-button>
          <van-button :class="(answer === 7 ? 'tab7Selected' : 'tab7')" @click="onSelect(7)" >1</van-button>
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
    questionSubtitle: {
      default: "",
      type: String
    },
    type: {
      default: "3"
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
      this.type="2";
      setTimeout(() => { this.$router.push({ name: "DailyFortuneLoading" }); }, 1500);
    },
    onSelect(id) {
      this.answer = id;
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
  top: 114px;
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
      margin: 0 4px 5px 4px;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: transparent;
    }

    .tab7Selected {
      width: 124px;
      height: 40px;
      margin: 0 4px 5px 4px;
      border: 1px solid #87929D;
      border-radius: 4px;
      background-color: #2F3941;
      color: white;
    }
  }

}

.bottom-btn {
  position: relative;
  background-color: #ff8600;
  color: white;
  font-size: 14px;
  left: 32px;
  height: 40px;
  width: 264px;
  top: 260px;
}
</style>
