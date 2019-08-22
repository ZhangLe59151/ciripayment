<template>
  <div class="box-card">
        <div class="title">{{ questionItem.question }} - {{ isAnswered }} </div>
        <div 
          class="option-block-2"
          v-if="questionItem.options.length === 2 && !isAnswered">
          <van-button
            v-for="(item,index) in questionItem.options"
            :key="index"
            class="option"
            @click="form.value=item"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-4"
          v-if="questionItem.options.length === 4 && !isAnswered">
          <van-button
            v-for="(item,index) in questionItem.options"
            :key="index"
            class="option"
            @click="form.value=item"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-6"
          v-if="questionItem.options.length > 4 && !isAnswered">
          <van-button
            v-for="(item,index) in questionItem.options"
            :key="index"
            class="option"
            @click="form.value=item"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-done-2" 
          v-if="questionItem.options.length === 2 && isAnswered">
          
          <van-button
            v-for="(item,index) in questionItem.options"
            v-if="questionItem.value != item"
            :key="index"
            class="option-done"
            >{{ item }}</van-button>

          <van-button
            v-for="(item,index) in questionItem.options"
            v-if="questionItem.value === item"
            :key="index"
            class="option-done-selected"
            >{{ item }}</van-button>
        </div>   
        <van-button 
          class="submit-btn"
          @click="submitQuestion">+{{ question.limitAmount }} {{$store.state.currency}} credit</van-button>
  </div>
</template>

<script>
export default {
  name: "AppQuestionSelectTwo",
  props: ['question'],
  data() {
    return {
      form: {
        value: "",
        id: this.question.id
      },
      limitAmount: this.question.limitAmount,
      list: {
        id: 1,
        limitAmount: 1000,
        options: ["111","2222","333","444","555"],
        question: "question",
        value: null,
        type: 2
      },
      questionItem: {},
      isAnswered: this.questionItem.value ? true : false
    }
  },
  created() {
    this.questionItem = this.question;
    this.isAnswered = this.questionItem.value ? true : false;
  },
  methods: {
    submitQuestion() {
      this.$api.submitQuestion(this.form).then(res => {
      if (res.data.code === 200) {
        limitAmount += this.question.limitAmount;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card{
      background-color: #ffffff;
      height: 340px;
      border-radius: 8px;
      position: relative;

      .title{
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        position: absolute;
        left: 30px;
        right: 30px;
        top: 30px;
      }

      .option-block {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 40%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .option-block-2 {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 40%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          height: 100%;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .option-block-4 {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 40%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          height: 50%;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .option-block-6 {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 40%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .option-block-done-2 {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 40%;

        .option-done-selected {
          border-color: #87929D;
          border-width: 1px;
          background-color: #87929D;
          color: white;
          border-radius: 4px;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }

        .option-done {
          border-color: #E9EBED;
          border-width: 1px;
          background-color: #E9EBED;
          color: #87929D;
          border-radius: 4px;
          width: 45%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .submit-btn{
        position: absolute;
        background: #FF8600;
        border-radius: 4px;
        left: 16px;
        right: 16px;
        width: 90%;
        height: 40px;
        color: white;
        font-size: 14px;
        line-height: 40px;
        bottom: 20px;
      }
    }
</style>
