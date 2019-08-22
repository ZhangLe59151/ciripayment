<template>
  <div class="box-card" v-if="!!question.value">
        <div class="title">{{ question.question }}</div>
        <div 
          class="option-block-2"
          v-if="questionItem.options.length === 2">
          <van-button
            v-for="(item,index) in question.options"
            :key="index"
            class="option"
            @click="setDate(item)"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-4"
          v-if="question.options.length === 4">
          <van-button
            v-for="(item,index) in question.options"
            :key="index"
            class="option"
            @click="setDate(item)"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-6"
          v-if="question.options.length > 4 ">
          <van-button
            v-for="(item,index) in questionItem.options"
            :key="index"
            class="option"
            @click="setDate(item)"
            >{{ item }}</van-button>
        </div>

        <van-button class="submit-btn" @click="submitQuestion">
          <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
          <img class="dollar-coin" src="../../assets/imgs/dollar_coin.png">
        </van-button>
  </div>
  <div class="box-card" v-else>
    <div class="title">{{ question.question }}</div>
        <div 
          class="option-block-done-2" 
          v-if="question.options.length === 2">
          
          <van-button
            v-for="(item,index) in question.options"
            v-if="question.value != item"
            :key="index"
            class="option-done"
            >{{ item }}</van-button>

          <van-button
            v-for="(item,index) in question.options"
            v-if="question.value === item"
            :key="index"
            class="option-done-selected"
            >{{ item }}</van-button>
        </div>

        <div 
          class="option-block-done-4" 
          v-if="question.options.length === 4">
          
          <van-button
            v-for="(item,index) in question.options"
            v-if="question.value != item"
            :key="index"
            class="option-done"
            >{{ item }}</van-button>

          <van-button
            v-for="(item,index) in question.options"
            v-if="question.value === item"
            :key="index"
            class="option-done-selected"
            >{{ item }}</van-button>
        </div>   
        <van-button class="submit-btn-done" @click="submitQuestion">
          <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
        </van-button>
  </div>
</template>

<script>
import util from "@/util.js";

export default {
  name: "AppQuestionSelectTwo",
  props: {
    question: Object
  },
  data() {
    return {
      form: {
        value: "",
        id: this.question.id
      },
      limitAmount: this.question.limitAmount,
      isAnswered: this.question.value ? true : false,
      value: ""
    }
  },
  created() {
    this.isAnswered = this.question.value ? true : false;
    this.limitAmount = this.question.limitAmount;
  },
  methods: {
    submitQuestion() {
      this.$api.submitQuestion(this.form).then(res => {
      if (res.data.code === 200) {
        limitAmount += this.question.limitAmount;
        }
      });
    },
    setData(item) {
      this.form.value = item;
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
          height: 100%;
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
          height: 100%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .option-block-done-4 {
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
          height: 50%;
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
          height: 50%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
      }

      .submit-btn{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 274px;
      height:40px;
      background-color: #FF8600;
      color:white;
      font-size: 14px;
      .btn-text{
        position: relative;
        left: -20px;
        top: -2px;
      }
      .dollar-coin{
        width: 24px;
        height:24px;
        position: absolute;
        top: 7px;
        right: 55px;
      }

    }

    .submit-btn-done{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 274px;
      height:40px;
      background-color: #C2C8CC !important;
      color:white !important;
      opacity: 1 !important;
      box-shadow: none !important;
      font-size: 14px;
    }

}
</style>
